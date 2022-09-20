import { useState, useEffect } from "react";
import { create, IPFS } from "ipfs-core";

export const IpfsUpload = () => {
  const [ipfs, setIpfs] = useState<IPFS>();

  useEffect(() => {
    if (!ipfs) {
      create().then(setIpfs);
    }
  }, [ipfs]);

  return (
    <div>
      <h4 data-test="status">
        IPFS status: {ipfs?.isOnline() ? "Online" : "Offline"}
      </h4>
    </div>
  );
};
