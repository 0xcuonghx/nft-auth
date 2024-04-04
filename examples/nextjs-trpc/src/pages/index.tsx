/**
 * This is a Next.js page.
 */
import { useAccount, useSignMessage } from "wagmi";
import { trpc } from "../utils/trpc";

export default function IndexPage() {
  const { address } = useAccount();
  const { signMessage } = useSignMessage();

  const { data: nonceData } = trpc.getNonce.useQuery();
  const { mutate, data } = trpc.login.useMutation();

  const sign = () => {
    signMessage(
      { message: nonceData?.nonce || "" },
      {
        onSuccess: (data) => {
          mutate({
            signedMessage: nonceData?.nonce || "",
            signerAddress: address?.toString() || "",
            signedSignature: data,
          });
        },
      }
    );
  };

  return (
    <div>
      <p>Signer: {address}</p>
      <p>Nonce: {nonceData?.nonce}</p>
      <p>jwt data: {data}</p>
      <button onClick={sign}>Sign message</button>
    </div>
  );
}
