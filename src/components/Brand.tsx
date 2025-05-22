type BrandSize = 'sm' | 'md' | 'lg' | 'xl';

interface BrandProps {
  size?: BrandSize;
}

const sizeMap: Record<BrandSize, string> = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
  xl: 'text-8xl',
};

const Brand = ({ size = 'lg' }: BrandProps) => {
  const textSize = sizeMap[size];

  return (
    <h1 className={`${textSize}`}>
      Moo
      <span className="dark:text-yellow-300">Duck</span>
    </h1>
  );
};

export default Brand;
