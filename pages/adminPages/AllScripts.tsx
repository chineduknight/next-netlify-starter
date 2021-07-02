import { useDisclosure } from '@chakra-ui/react';
import { getAllScripts } from 'lib/redux/admin/action';
import { RootReducer } from 'lib/redux/reducers';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import AllScirptLayout from './AllScriptLayout'

const AllScripts = () => {
  const { onOpen } = useDisclosure();
  const userScripts = useSelector((state: RootReducer) => state.admin.adminAll.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllScripts())
  }, [dispatch]);

  const deleteScript = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  return (
    <div>
      <AllScirptLayout
        scripts={userScripts}
        onOpen={onOpen}
        deleteScript={deleteScript}
        verifyScript={deleteScript}
        rejectScript={deleteScript}
      />
    </div>
  )
}

export default AllScripts
