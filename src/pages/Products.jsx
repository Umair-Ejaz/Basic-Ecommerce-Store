// Example: src/pages/Products.jsx
import UserLayout from "../components/Layout/UserLayout";
import ProductList from "../components/admin/AdminProductList";
import UserProductList from "./UserProductList";
// import UserLayout from "../../layouts/UserLayout";

export default function Products() {
    return (
        <UserLayout>
            <UserProductList />
        </UserLayout>
    );
}
