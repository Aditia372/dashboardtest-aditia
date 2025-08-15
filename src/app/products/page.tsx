"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Table, 
  Input, 
  Button, 
  Modal, 
  Form, 
  InputNumber, 
  Space, 
  Typography,
  Pagination,
  message,
  Popconfirm,
  Spin
} from 'antd';
import type { TableProps } from 'antd';
import api from '@/lib/axios'; 
import { useDebounce } from 'use-debounce';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const { Search } = Input;
const { Title } = Typography;

interface Product {
  product_id: string;
  product_title: string;
  product_price: number;
  product_description?: string;
  product_image?: string;
  product_category?: string;
  created_timestamp: string;
  updated_timestamp: string;
}

const ProductPage = () => {
  const { user, loading: authLoading } = useAuth(); 
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const [form] = Form.useForm();

  useEffect(() => {
    const loadData = async () => {
      if (!authLoading && user) {
        setLoading(true);
        try {
          const params = {
            page: pagination.page,
            limit: pagination.limit,
            ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
          };
          const { data } = await api.get('/products', { params });
          
          if (Array.isArray(data.data)) {
            setProducts(data.data);
          } else {
            setProducts([]);
          }
          setPagination(prev => ({ ...prev, total: data.total_data || 0 }));
        } catch (error) {
          message.error('Gagal mengambil data produk. Sesi Anda mungkin telah berakhir.');
          console.error(error);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, [user, authLoading, pagination.page, pagination.limit, debouncedSearchTerm]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setPagination(prev => ({ ...prev, page: 1 }));
    }
  }, [debouncedSearchTerm]);


  const showModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      form.setFieldsValue(product);
    } else {
      setEditingProduct(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values: any) => {
    const payload = { ...values, product_id: editingProduct?.product_id };
    try {
      if (editingProduct) {
        await api.put('/product', payload);
        message.success('Produk berhasil diperbarui!');
      } else {
        await api.post('/product', payload);
        message.success('Produk berhasil dibuat!');
      }
      setIsModalVisible(false); 
      const { data } = await api.get('/products', { params: { page: 1, limit: pagination.limit } });
      setProducts(data.data || []);
      setPagination(prev => ({ ...prev, page: 1, total: data.total_data || 0 }));
    } catch (error) {
      message.error('Operasi gagal.');
    }
  };
  
  const handleDelete = async (productId: string) => {
      message.info('Fungsi hapus belum diimplementasikan di backend tes ini.');
  };

  const columns: TableProps<Product>['columns'] = useMemo(() => [
    { title: 'Product Title', dataIndex: 'product_title', key: 'product_title' },
    { title: 'Price', dataIndex: 'product_price', key: 'product_price', render: (price) => `Rp ${price.toLocaleString('id-ID')}` },
    { title: 'Category', dataIndex: 'product_category', key: 'product_category' },
    { title: 'Description', dataIndex: 'product_description', key: 'product_description', ellipsis: true },
    { title: 'Actions', key: 'actions', render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showModal(record)}>Edit</Button>
          <Popconfirm title="Hapus produk" description="Apakah Anda yakin?" onConfirm={() => handleDelete(record.product_id)} okText="Ya" cancelText="Tidak">
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ], []);

  if (authLoading || !user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Product Management</Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Search placeholder="Cari produk..." onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 400 }} allowClear />
          <Button type="primary" onClick={() => showModal()}>Create Product</Button>
        </div>
        <Table columns={columns} dataSource={products} loading={loading} rowKey="product_id" pagination={false} />
        <Pagination current={pagination.page} pageSize={pagination.limit} total={pagination.total} onChange={(page, pageSize) => setPagination({ ...pagination, page, limit: pageSize })} showSizeChanger style={{ textAlign: 'right' }} />
      </Space>
      <Modal title={editingProduct ? 'Edit Product' : 'Create Product'} open={isModalVisible} onCancel={handleCancel} destroyOnHidden footer={null}>
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} style={{ marginTop: '24px' }}>
          <Form.Item name="product_title" label="Product Title" rules={[{ required: true, message: 'Judul produk harus diisi!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="product_price" label="Price" rules={[{ required: true, message: 'Harga harus diisi!' }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="product_category" label="Category"><Input /></Form.Item>
          <Form.Item name="product_description" label="Description"><Input.TextArea rows={4} /></Form.Item>
          <Form.Item name="product_image" label="Image URL"><Input /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginTop: '24px' }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductPage;
