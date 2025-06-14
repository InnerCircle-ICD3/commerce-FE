export const deleteAddress = async (addressId: number) => {
    const response = await fetch(`http://localhost:3000/api/users/addresses/${addressId}`, {
        method: "DELETE",
    });
    return response.json();
};
