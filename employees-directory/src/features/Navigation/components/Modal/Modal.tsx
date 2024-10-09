import React, { ChangeEvent } from 'react';
import "./index.scss";

interface ModalProps {
  onSortOrderChange: (sortOrder: string) => void;
  currentSortOrder: string;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({
  onSortOrderChange,
  currentSortOrder,
  closeModal,
}) => {
  const handleSortChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSortOrderChange(event.target.value);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal__sort-container">
        <div className="modal__sort-container-title">
          <div className="modal__sort-container-title-line"></div>
          <div className="modal__sort-container-title-name">
            Сортировка
          </div>
        </div>
        <ul className="modal__sort-container-list">
          <li className="modal__sort-container-list-item">
            <input
              type="radio"
              id="alphabetical"
              name="sort"
              value="alphabetical"
              checked={currentSortOrder === 'alphabetical'}
              onChange={handleSortChange}
            />
            <label
              className="modal__sort-container-list-item--label"
              htmlFor="alphabetical"
            >
              По алфавиту
            </label>
          </li>
          <li className="modal__sort-container-list-item">
            <input
              type="radio"
              id="birthday"
              name="sort"
              value="birthday"
              checked={currentSortOrder === 'birthday'}
              onChange={handleSortChange}
            />
            <label
              className="modal__sort-container-list-item--label"
              htmlFor="birthday"
            >
              По дню рождения
            </label>
          </li>
        </ul>
      </div>
      <div className="bottom-line"></div>
    </div>
  );
};

export default Modal;

