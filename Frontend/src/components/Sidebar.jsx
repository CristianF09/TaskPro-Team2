import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards, saveBoard, deleteBoard } from '../redux/boardsSlice';
import { logout } from '../redux/auth/authSlice';
import sprite from '../assets/sprite.svg';
import styles from './Sidebar.module.css';
import CreateBoardModal from './CreateBoardModal';
import HelpModal from './HelpModal';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const { boards, loading } = useSelector(state => state.boards);
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <aside className={styles.sidebar}>
      <h2>My Boards</h2>
      <div className={styles.boardHeader}>
        <span className={styles.createBoardText}>Create New Board</span>
        <button
          className={styles.plusButton}
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>
      </div>
      {loading && <p>Loading...</p>}
      <ul className={styles.boardList}>
        {boards.map(board => (
          <li key={board._id} className={styles.boardItem}>
            <svg className={styles.boardIcon} aria-hidden="true">
              <use xlinkHref={`${sprite}#${board.icon}`} />
            </svg>
            <span className={styles.boardTitle}>{board.title}</span>
            <button
              className={styles.editButton}
              onClick={() => {
                setSelectedBoard(board);
                setIsModalOpen(true);
              }}
            >
              <svg className={styles.boardButtonIcon} aria-hidden="true">
                <use xlinkHref={`${sprite}#icon-pencil`} />
              </svg>
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => dispatch(deleteBoard(board._id))}
            >
              <svg className={styles.boardButtonIcon} aria-hidden="true">
                <use xlinkHref={`${sprite}#icon-trash`} />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <button 
        className={styles.needHelp} 
        onClick={() => setIsHelpModalOpen(true)}
      >
        Need Help?
      </button>
      <button className={styles.logout} onClick={handleLogout}>
        Log Out
      </button>

      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        boardToEdit={selectedBoard}
      />
      <HelpModal 
        isOpen={isHelpModalOpen} 
        onClose={() => setIsHelpModalOpen(false)} 
      />
    </aside>
  );
};

export default Sidebar;