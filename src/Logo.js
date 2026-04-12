import logoImg from './logo.png';

function Logo({ size = 32 }) {
  return (
    <img
      src={logoImg}
      alt="FoodReels"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.2,
        objectFit: 'cover'
      }}
    />
  );
}

export default Logo;