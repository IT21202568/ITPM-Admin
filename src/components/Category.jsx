import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Table, Space } from "antd";
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

const Category = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const items = await getCategories();
    setCategories(items);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editingCategory) {
      await updateCategory(editingCategory.id, values);
    } else {
      await addCategory(values);
    }
    setIsModalVisible(false);
    fetchCategories(); // Refresh the list after adding/updating
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingCategory(null); // Clear editing state
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    fetchCategories(); // Refresh the list after deletion
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    showModal(); // Show the modal for editing
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          form.resetFields();
          setEditingCategory(null);
          showModal();
        }}
      >
        Add New Category
      </Button>
      <Modal
        title={editingCategory ? "Edit Category" : "Add New Category"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the category description!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={categories} rowKey="id" />
    </div>
  );
};

export default Category;
