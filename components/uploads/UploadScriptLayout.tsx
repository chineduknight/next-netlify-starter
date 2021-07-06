/* eslint-disable react/display-name */
import { Button, Flex, Tag, VStack } from '@chakra-ui/react'
import TableDisplay from 'components/TableWrapper';
import dayjs from 'dayjs';
import { FaPlus, FaPencilAlt, FaEye, FaTrash } from 'react-icons/fa';
// import { useHistory } from 'react-router-dom';
import { useRouter } from 'next/router'

type UploadScriptLayoutProp = {
  onOpen: () => void
  deleteMyScript: (id) => void
  scripts: any
  loading: boolean
}

const UploadScriptLayout = (props: UploadScriptLayoutProp) => {
  const history = useRouter();
  const { onOpen, scripts, deleteMyScript, loading } = props;
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
              record.isVerified ? "#BBE5B3"
                : '#FFEA8A'
            }
            color="#414F3E"
            fontSize="xs"
            textTransform="capitalize"
          >
            {record.isVerified ? "Verified" : "Pending"}
          </Tag>

        </div>
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
      title: 'Edit',
      render: (value: any, record: any) => (
        <Button> <FaPencilAlt /></Button>
      ),
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
          onClick={() => deleteMyScript(record.id)}
        ><FaTrash /> </Button>
      ),
    },
  ];
  return (
    <>
      <Flex justify="center">

        <TableDisplay
          header="User Script"
          dataSource={scripts.scripts || []}
          columns={columns}
          loading={loading}
          pagination={true}
        />

      </Flex>

      <VStack>
        <Button
          leftIcon={<FaPlus />}
          onClick={onOpen}
        >Upload New Script  </Button>

      </VStack>
    </>
  )
}

export default UploadScriptLayout

