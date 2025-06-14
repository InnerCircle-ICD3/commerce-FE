import { useQuery } from "@tanstack/react-query";
import { orderPrepare } from "../api/orderPrepare";

interface UseOrderPrepareProps {
    cartItemIds: string;
}
export const useOrderPrepare = (props: UseOrderPrepareProps) => {
    return useQuery({
        queryKey: ["orderPrepare", { cartItemIds: props.cartItemIds }],
        queryFn: () => orderPrepare(props.cartItemIds),
    });
};
