import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchEmployees } from '../../redux/employeesSlice';
import { selectFilteredEmployees } from '../../redux/employeesSelectors';
import EmployeeSkeleton from './EmployeeSkeleton/EmployeeSkeleton';
import './index.scss';

const EmployeesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const filteredEmployees = useAppSelector(selectFilteredEmployees);
  const status = useAppSelector((state) => state.employees.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  const handleItemClick = (id: string) => {
    navigate(`/employees/${id}`);
  };

  return (
    <div className="main">
      {status === 'loading' && (
        <ul className="employee-list">
          {Array(17)
            .fill(0)
            .map((_, index) => (
              <EmployeeSkeleton key={index} />
            ))}
        </ul>
      )}

      {status === 'succeeded' && filteredEmployees.length === 0 ? (
        <div className="search-error">
          <img
            src="/images/left-pointing-magnifying-glass_1f50d.png"
            alt="search-img"
          />
          <div className="search-titles">
            <h2>Мы никого не нашли</h2>
            <span>Попробуй скорректировать запрос</span>
          </div>
        </div>
      ) : (
        status !== 'loading' && (
          <ul className="employee-list">
            {filteredEmployees.map((user) => (
              <li
                className="employee-item"
                key={user.id}
                onClick={() => handleItemClick(user.id)}
              >
                <div className="employee-content">
                  <div className="employee-photocontainer">
                    <img
                      src={user.avatar}
                      alt="employee photo"
                      className="employee-photo"
                    />
                  </div>
                  <div className="employee-info">
                    <div className="employee-header">
                      <h2 className="employee-name">{user.name}</h2>
                      <span className="employee-tag">{user.tag}</span>
                    </div>
                    <p className="employee-role">{user.position}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default EmployeesList;

