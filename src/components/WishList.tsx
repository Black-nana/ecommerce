import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../appRedux/slice/whishlist/wishlistSlice';
import { RootState } from '../appRedux/slice/rootReducer';
import TextGradient from './TextGradient';
import bars from '../assets/bar-1.svg';
import { useTable, Column } from 'react-table';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {toast, ToastContainer} from 'react-toastify';
import { useAuth } from '../Auth/useAuth';
import { Link } from 'react-router-dom';

interface Item {
  id: number;
  name: string;
  price: number;
}

const Wishlist: React.FC = () => {
  const { user } = useAuth(); // Get the user 
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist);

  const handleRemoveFromWishlist = (itemId: number) => {
    dispatch(removeFromWishlist(itemId));
    toast.error('Item removed from wishlist');
  };

  const data = React.useMemo(() => wishlist, [wishlist]);
  console.log('data from wishlist in wishlist',data);
  

  const columns = React.useMemo<Column<Item>[]>(
    () => [
      {
        Header: 'Name', // Header of the column
        accessor: 'name', // Value accessor
      },
      {
        Header: 'Price', // Header of the column
        accessor: 'price', // Value accessor
      },
      {
        Header: 'Action',
        accessor: 'id',
        Cell: ({ value }: { value: number }) => (
          <button onClick={() => handleRemoveFromWishlist(value)}
          className='w-full flex gap-10 bg-red-400 rounded-md p-2 text-red-900 font-bold hover:bg-red-500'
          ><FontAwesomeIcon icon={faHeartBroken} className='text-red-900' />
           <span>
              Remove
           </span>
           </button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className='w-full grid place-items-center pt-10'>
      <ToastContainer/>
      <TextGradient>
        <div className="grid place-items-center my-10">
          <h1 className='text-inherit'>Wish List</h1>
          <div>
            <img
              alt="bar"
              loading="lazy"
              width="500"
              height="50"
              decoding="async"
              data-nimg="1"
              className="mt-6"
              src={bars}
            />
          </div>
        </div>
      </TextGradient>
      <div className='w-full'>
       {user ? (
         <table {...getTableProps()} className='w-full '>
         <thead>
           {headerGroups.map((headerGroup) => (
             <tr {...headerGroup.getHeaderGroupProps()} className='border-t-2 border-b-2'>
               {headerGroup.headers.map((column) => (
                 <th {...column.getHeaderProps()} className=''>{column.render('Header')}</th>
               ))}
             </tr>
           ))}
         </thead>
         <tbody {...getTableBodyProps()} className=''>
           {rows.map((row) => {
             prepareRow(row);
             return (
               <tr {...row.getRowProps()} className='border-b-4 py-5'>
                 {row.cells.map((cell) => (
                   <td {...cell.getCellProps()} className='p-4'>{cell.render('Cell')}</td>
                 ))}
               </tr>
             );
           })}
         </tbody>
       </table>
       ):(
        <div className='grid place-items-center h-64'>
          <Link to={'/signin'}>
          <button className='btn bg-red-400 text-white font-bold text-xl py-2 px-4 rounded-lg'>Please Log in</button>
          </Link>
        </div>
       )

       }
      </div>
    </div>
  );
};

export default Wishlist;
