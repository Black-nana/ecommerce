import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';
import DataQuery from '../tanstackQuery/DataQuery';
import { Button } from '@mui/material';

const Jewelry = () => {
  const { data, error, isLoading } = DataQuery();
  const products = data?.jewelry;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid gap-5 p-4 w-full mx-10 justify-start items-center my-20 bg-pink-50">
      <div className="flex flex-col justify-center items-center">
        <div className="w-5/6 grid place-items-center my-10">
          <h1 className="font-sans font-extrabold text-5xl ">
            Jewelry selections
          </h1>
          <div className="h-2 w-52 rounded-3xl my-4 bg-purple-600"></div>
          <p className="text-center">
            Discover timeless elegance and unparalleled craftsmanship with our
            curated selection of jewelry pieces. From delicate necklaces to
            dazzling earrings, each item is meticulously crafted to elevate your
            style and add a touch of sophistication to any ensemble. Whether
            you're looking for a statement piece to complete your evening look
            or a subtle accessory to complement your everyday wardrobe, our
            collection has something for every occasion. Explore our range of
            jewelry and find the perfect piece to express your unique style.
          </p>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-5 justify-start">
        {products.map((product: any) => (
  <Card
    key={product.id} // Corrected: key attribute should be within curly braces
    sx={{ maxWidth: 500 }}
    className="flex flex-col justify-center items-center"
  >
    <img
      src={product?.image}
      alt={product?.title}
      className="h-40 w-40"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {product?.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {product?.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Link to={`/product/${product?.id}`}>
        <Button size="small">Buy Me</Button>
      </Link>
    </CardActions>
  </Card>
))}

        </div>
      </div>
    </div>
  );
};

export default Jewelry;
