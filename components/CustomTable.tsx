import React, { useState } from 'react';
import styled from '@emotion/styled';
import { nanoid } from 'nanoid';
import { Spinner } from '@chakra-ui/react';
import NoData from './NoData';

export interface ColumnsType<T = Record<string, any>> {
  title: string;
  dataIndex?: keyof T | string;
  // this is still being tested
  // render?: (dataValue: string | number, record: T, index: number) => React.ReactNode;
}

export interface CustomTableProps<TableDataType = Record<string, any>> {
  dataSource: TableDataType[];
  columns: ColumnsType<TableDataType>[];
  loading?: boolean;
  pagination?: boolean;
}

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination = (props: PaginationProps) => {
  const { postsPerPage, totalPosts, paginate, currentPage } = props;
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Pagination.Wrapper>
      <ul>
        <button disabled={currentPage <= 1} className="first" onClick={() => paginate(currentPage - 1)}>&laquo;</button>
        {pageNumbers.map((number) => (
          <li key={nanoid()}>
            <button
              className={`${currentPage === number ? 'active' : ''}`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>

          </li>
        ))}
        <button
          className="last"
          disabled={currentPage >= pageNumbers.length}
          onClick={() => paginate(currentPage + 1)}
        >&raquo;
        </button>
      </ul>
    </Pagination.Wrapper>
  );
};

Pagination.Wrapper = styled.nav`
  display:flex;
  justify-content:flex-end;
  margin-top:1rem;
  ul{
    display:flex;
    list-style-type:none;
  }
  button{
    color: black;
    padding: 8px 16px;
    text-decoration: none;
    border: 1px solid #ddd;
    &:hover:not(.active) {
      background-color: #ddd;
    }
    &:disabled,
    &[disabled]{
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
      cursor:default;
      &:hover{
      background-color: #cccccc;
      }
}
  }
  .first{
    border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    .last{
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  .active {
  /* background-color: #1f74bd; */
  color: #1f74bd;
  border: 1px solid #1f74bd;
}
`;
const CustomTable = (props: CustomTableProps) => {
  const { dataSource, columns, loading, pagination } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentData = pagination ? dataSource.slice(indexOfFirstPost, indexOfLastPost) : dataSource;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (

    <CustomTable.Wrapper>
      {loading &&
        <div className="spinner-holder">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl" />
        </div>
      }

      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.title}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            !loading && currentData.length > 0 ? currentData.map((record, index) => (
              <tr key={nanoid()}>
                {
                  columns.map((column: any) => {
                    let nodeValue = record[column.dataIndex || ''];
                    nodeValue = column.render ? column.render(nodeValue, record, index) : nodeValue;
                    return (
                      <td key={column.title}>{nodeValue}</td>
                    );
                  })
                }
              </tr>
            )) : (

              <tr>
                <td colSpan={columns.length}>
                  <NoData />
                </td>
              </tr>
            )

          }
        </tbody>
      </table>
      {
        pagination && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={dataSource.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )
      }
    </CustomTable.Wrapper>
  );
};

CustomTable.Wrapper = styled.div`
position: relative;
overflow-x:auto;
.spinner-holder{
  background-color:rgba(0,0,0,0.5);
  position:absolute;
  inset:0;
  display:flex;
  justify-content:center;
  align-items:center;
}
table{
  /* width: 100%; */
  display: block;
    overflow-x: auto;
    white-space: nowrap;
  th{
    background-color:#EDF2F7;
    color:#1D294C;
    padding:0.8rem;
    text-transform:uppercase;
  }
  td{
    color:#1D294C;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 15px;
    text-align:center;
  }
}
@media only screen and (max-width : 600px) {
   th{
     /* padding:0.5rem !important;
     font-size:13px; */
   }
   svg{
     /* width:150px;
     hei1ght:200px; */
   }
  }
`;

export default CustomTable;