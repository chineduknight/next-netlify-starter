import { useDisclosure } from "@chakra-ui/react";
import { createScript, deleteScript, myScripts } from "lib/redux/scripts/action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { errorToast } from 'utils/hooks';
import UploadModal from "components/uploads/UploadModal";
import UploadScriptLayout from "components/uploads/UploadScriptLayout";
import { useRouter } from 'next/router'
import { RootReducer } from 'lib/redux/reducers';
import { PUBLIC_PATHS } from 'routes/pagePath';

const UploadScript = () => {
  const history = useRouter();
  const user = useSelector<RootReducer, any>((state) => state.auth.user);


  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { processing, success } = useSelector<RootReducer, any>(
    (state: any) => state.scripts.createScript
  );
  const userScripts = useSelector<RootReducer, any>(
    (state: any) => state.scripts.myScripts
  );
  // useEffect(() => {
  //   dispatch(myScripts());
  // }, [dispatch]);
  useEffect(() => {
    if (!user.success) {
      history.push(PUBLIC_PATHS.LOGIN)
    } else {
      dispatch(myScripts());
    }
  }, [history, user, dispatch])

  const [formValues, setFormValues] = useState({
    name: "",
    composer: "",
    category: "All",
    document: "",
    documentName: "",
    audio: "",
    audioName: "",
    videoUrl: "",
    description: ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    e.persist();
    const { name, files } = e.target;
    const selectedFile = files[0];

    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        return errorToast("File must be less than 10Mb")
      }
      if (name === "audio") {
        setFormValues({
          ...formValues,
          audioName: selectedFile.name,
          audio: selectedFile
        });
      } else {
        if (!selectedFile.type.startsWith("image") &&
          selectedFile.type !== "application/pdf") {
          return errorToast("Please select an image or Pdf")
        }
        setFormValues({
          ...formValues,
          document: selectedFile,
          documentName: selectedFile.name,
        });
      }
    }
  };
  const handleSubmit = () => {
    const formdata = new FormData();
    for (const [key, value] of Object.entries(formValues)) {
      formdata.append(key, value);
    }
    dispatch(createScript(formdata));
  };
  const deleteMyScript = (id) => {
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
        dispatch(deleteScript(id))
      }
    })
  }
  useEffect(() => {
    if (success) {
      onClose();
      setFormValues({
        name: "",
        composer: "",
        category: "All",
        document: "",
        documentName: "",
        audio: "",
        audioName: "",
        videoUrl: "",
        description: ""
      })
    }
  }, [onClose, success])

  return (
    <div>
      <UploadModal
        isOpen={isOpen}
        onClose={onClose}
        formData={formValues}
        onChange={onChange}
        handleFileUpload={handleFileUpload}
        // handleSubmit={uploadFile}
        handleSubmit={handleSubmit}
        isLoading={processing}
      />
      <UploadScriptLayout
        onOpen={onOpen}
        scripts={userScripts.data}
        deleteMyScript={deleteMyScript}
        loading={userScripts.processing}
      />
    </div>
  );
};

export default UploadScript;
