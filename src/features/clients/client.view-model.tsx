import { useClientModel } from "@features/clients/client.model";
import { ClientView } from "@features/clients/client.view";

export function ClientViewModel() {
  const methods = useClientModel();
  return <ClientView {...methods} />;
}
