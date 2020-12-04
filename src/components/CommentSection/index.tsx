import React, { useEffect, useRef, useState } from 'react';
import Cookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { comment } from 'components/actions';
import SectionHeader from 'elements/SectionHeader';
import styles from './styles.scss';
import { Obj } from 'interfaces/common';
import { State } from 'redux-saga/reducers';

export interface Comment {
  user_name: string;
  avatar?: string;
  date: Date;
  content: string;
  rating?: string;
}

interface CommentSectionProps {
  comments?: Comment[];
  id_food: any;
}

const CommentComp = (props: Comment) => {
  return (
    <div className={styles.Comment}>
      <div className={styles.UserInfo}>
        <div>{props.avatar ? <img src={props.avatar} alt="avatar" /> : <Icon name="user outline" />}</div>
        <div className={styles.Info}>
          <div>{props.user_name}</div>
          {/* <span>{calculateDate()}</span> */}
        </div>
      </div>
      <div className={styles.Content}>
        <span>{props.content}</span>
      </div>
    </div>
  );
};

export default (props: CommentSectionProps) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const ref = useRef<{ userLogin?: Obj }>({
    userLogin: Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string).data : null,
  });
  const userLogin1 = useSelector((state: State) => state.userLogin);

  useEffect(() => {
    if (userLogin1 && userLogin1.data) {
      ref.current.userLogin = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string).data : null;
    }
  }, [userLogin1]);

  const onSend = () => {
    const params = {
      id_user: ref.current.userLogin?.id,
      date: new Date(),
      comment: value,
      id_food: props.id_food,
    };
    dispatch(comment(params));
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
      {ref.current.userLogin && (
        <div className={styles.Input}>
          <Icon name="user outline" />
          <input type="text" onChange={onChange} value={value} onKeyDown={onPressEnter} />
          <span onClick={onSend}>
            <Icon name="send" />
          </span>
        </div>
      )}
      <div className={styles.CommentList}>
        {props.comments &&
          props.comments.map((commentData, index) => {
            return (
              <CommentComp
                user_name={commentData.user_name}
                avatar={commentData.avatar}
                date={commentData.date}
                content={commentData.content}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
};
