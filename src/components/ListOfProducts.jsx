import { useEffect } from 'react'
import { Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr, Td } from '@chakra-ui/react'
import Loader from './Loader'
import { Link } from 'react-router-dom'
// import { useProductStore } from '../store/useStore'


function ListOfProducts() {

    // const { fetchProducts, products, loading } = useProductStore(state => state)

    // useEffect(() => {
    //     fetchProducts()
    // }, [])

    // const slicedproducts = products.slice(1, 4)
    

    // if (loading) return <Loader />

  return (
    <TableContainer>
        <Table>
            <TableCaption><Link to="/products" className='underline text-blue-700'>List available Products</Link></TableCaption>
            <Thead>
                <Tr>
                    <Th>Product Name</Th>
                    <Th>Product Category</Th>
                </Tr>
            </Thead>

            <Tbody>
                {/* {
                    slicedproducts && slicedproducts.map(product => (
                        <Tr key={product._id}>
                            <Td>{product.ItemName}</Td>
                            <Td>{product.category}</Td>
                        </Tr>
                    ))
                } */}
            </Tbody>
        </Table>
    </TableContainer>
  )
}

export default ListOfProducts