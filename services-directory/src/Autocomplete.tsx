import { useEffect, useState } from 'react';

type Product = {
  id: number;
  title: string;
};

type ProductResponse = {
  products: Product[];
};

type AutocompleteProps = {
  onSelectItem: (item: string) => void;
};

const Autocomplete = ({ onSelectItem }: AutocompleteProps) => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`;

        const response = await fetch(url, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data: ProductResponse = await response.json();

        if (!controller.signal.aborted) {
          setProducts(data.products);
          setIsLoading(false);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
          setError('Unable to load suggestions.');
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  function handleInputChange(value: string) {
    setQuery(value);
    setProducts([]);
    setError('');
    setIsLoading(value.trim().length > 0);
  }

  return (
    <div className='wrapper'>
      <div className={`control ${isLoading ? 'is-loading' : ''}`}>
        <input
          className='input'
          type='text'
          placeholder='Search products...'
          value={query}
          onChange={(event) => handleInputChange(event.target.value)}
        />

        {isLoading && <span className='loading-text'>Loading...</span>}
      </div>

      {error && <p className='error-message'>{error}</p>}

      {!isLoading && products.length > 0 && (
        <div className='list'>
          {products.map((product) => (
            <a
              key={product.id}
              className='list-item'
              href='#'
              onClick={(event) => {
                event.preventDefault();
                onSelectItem(product.title);
                setProducts([]);
              }}
            >
              {product.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
