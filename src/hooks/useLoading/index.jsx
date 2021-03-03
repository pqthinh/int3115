import { useContext } from "react";

import { LoadingContext } from "../../providers/loadingProvider";

const useLoading = () => {
  const { showLoading, setLoading } = useContext(LoadingContext);

  return {
    showLoading,
    setLoading,
  };
};

export default useLoading;
