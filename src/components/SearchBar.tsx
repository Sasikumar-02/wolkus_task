import React, { useState } from 'react';
import { Input, Form, Button } from 'antd';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [form] = Form.useForm();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Form form={form} onFinish={handleSearch} layout="inline">
      <Form.Item>
        <Input
          placeholder="Search for a movie..."
          value={query}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{width:'100px', color:'white', background:'#0B4266'}}>
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchBar;
