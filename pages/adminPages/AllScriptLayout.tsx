/* eslint-disable react/display-name */
import { Button, Tag, Flex } from '@chakra-ui/react'
import Table from 'components/CustomTable';
import dayjs from 'dayjs';
import { FaEye, FaCheck, FaTrash } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
// import { useHistory } from 'react-router-dom';
import { useRouter } from 'next/router'

type AllScirptLayoutProp = {
  onOpen: () => void
  scripts: any
  deleteScript: () => void
  verifyScript: () => void
  rejectScript: () => void
}

const AllScirptLayout = (props: AllScirptLayoutProp) => {
  const history = useRouter();
  const { scripts, deleteScript, verifyScript, rejectScript } = props;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Composer',
      dataIndex: 'composer',
    },
    {
      title: 'Published',
      render: (value: any, record: any) => (
        <div>
          <Tag
            borderRadius='full'
            bg={
              record.isVerified === "pending" ? "#BBE5B3" :
                record.isVerified === "cancelled" ? "red" : '#FFEA8A'
            }
            color="#414F3E"
            fontSize="xs"
            textTransform="capitalize"
          >
            {record.isVerified}
          </Tag>

        </div >
      ),
    },
    {
      title: 'Uploaded On',
      render: (value: any, record: any) => (
        <div> {dayjs(record.createdAt).format('MMM D YYYY')}</div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },

    {
      title: 'View',
      render: (value: any, record: any) => (
        <Button variant="secondary"
          onClick={() => history.push(`/scripts/${record.slug}`)}
        ><FaEye /></Button>
      ),
    },
    {
      title: 'Delete',
      render: (value: any, record: any) => (
        <Button bg="orangered"
          onClick={deleteScript}
          _hover={{
            backgroundColor: "orangered"
          }}
        ><FaTrash /> </Button>
      ),
    },
    {
      title: 'Verify',
      render: (value: any, record: any) => (
        <Button
          onClick={verifyScript}
          bg="green.500"><FaCheck /> </Button>
      ),
    },
    {
      title: 'Reject',
      render: (value: any, record: any) => (
        <Button
          onClick={rejectScript}
          bg="red.800"><MdCancel /> </Button>
      ),
    },
  ];
  return (
    <Flex justify="center">

      <Table
        dataSource={scripts || []}
        columns={columns}
        loading={false}
        pagination={false}
      />


    </Flex>
  )
}

export default AllScirptLayout

