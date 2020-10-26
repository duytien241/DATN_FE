import { comment } from 'components/actions';
import SectionHeader from 'elements/SectionHeader';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import styles from './styles.scss';

export interface Comment {
  name: string;
  avatar?: string;
  date: Date;
  text: string;
}

interface CommentSectionProps {
  comments?: Comment[];
}

const CommentComp = (props: Comment) => {
  const calculateDate = () => {
    const today = new Date();
    const difference = today.getTime() - props.date.getTime();
    const days = difference / (1000 * 3600 * 24);
    const weeks = days / 7;
    const months = weeks / 4;
    const years = months / 12;

    if (years >= 1) return `${Math.floor(years)} years ago`;
    if (months >= 1) return `${Math.floor(months)} months ago`;
    if (weeks >= 1) return `${Math.floor(weeks)} weeks ago`;
    return `${Math.floor(days)} days ago`;
  };

  return (
    <div className={styles.Comment}>
      <div className={styles.UserInfo}>
        <div>{props.avatar ? <img src={props.avatar} alt="avatar" /> : <Icon name="user outline" />}</div>
        <div className={styles.Info}>
          <div>{props.name}</div>
          <span>{calculateDate()}</span>
        </div>
      </div>
      <div className={styles.Content}>
        <span>{props.text}</span>
      </div>
    </div>
  );
};

export default (props: CommentSectionProps) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const onSend = () => {
    dispatch(comment({ name: 'Thiện', date: new Date(), text: value }));
    setValue('');
  };

  const onPressEnter = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    event.keyCode === 13 && onSend();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.CommentSection}>
      <SectionHeader title="BÌNH LUẬN" />
      <div className={styles.Input}>
        <Icon name="user outline" />
        <input type="text" onChange={onChange} value={value} onKeyDown={onPressEnter} />
        <span onClick={onSend}>
          <Icon name="send" />
        </span>
      </div>
      <div className={styles.CommentList}>
        {props.comments &&
          props.comments.map((comment, index) => {
            return (
              <CommentComp
                name={comment.name}
                avatar={comment.avatar}
                date={comment.date}
                text={comment.text}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
};
