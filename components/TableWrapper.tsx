import styled from '@emotion/styled';
import CustomTable, { CustomTableProps } from './CustomTable';

interface TableDisplayProps extends CustomTableProps {
  header: string;
}

const TableDisplay = (props: TableDisplayProps) => {
  const { header, dataSource, columns, loading, pagination } = props;
  return (
    <TableDisplay.Wrapper>
      <h1>{header}</h1>
      <CustomTable
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        pagination={pagination}
      />
      <div className="small-txt">
        <small>Table can scroll</small>
      </div>

    </TableDisplay.Wrapper>
  );
};

TableDisplay.Wrapper = styled.div`
  overflow-x:auto;
  margin-top:2rem;
  background-color:#fff;
  padding:2rem;
  h1{
    font-size:1.3rem;
    color:#4e6e97;
    margin: 0 0 2rem;
    text-transform:uppercase;
  }
  .small-txt{
    display:flex;
    justify-content:center;
  }
`;
export default TableDisplay;
