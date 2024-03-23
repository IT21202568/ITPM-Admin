import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Table, Space, InputNumber } from "antd";
import {
  addPromotion,
  getPromotions,
  updatePromotion,
  deletePromotion,
} from "../services/promotionsService";

const Promotions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    const items = await getPromotions();
    setPromotions(items);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editingItem) {
      await updatePromotion(editingItem.id, values);
    } else {
      await addPromotion(values);
    }
    setIsModalVisible(false);
    fetchPromotions();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    await deletePromotion(id);
    fetchPromotions();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    showModal();
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Discount (%)",
      dataIndex: "discount",
      key: "discount",
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
      <Button type="primary" onClick={showModal}>
        Add New Promotion
      </Button>
      <Modal
        title={editingItem ? "Edit Promotion" : "Add New Promotion"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="title"
            label="Promotion Title"
            rules={[
              { required: true, message: "Please input the promotion title!" },
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
                message: "Please input the promotion description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Discount (%)"
            rules={[
              {
                required: true,
                message: "Please input the discount percentage!",
              },
              {
                type: "number",
                min: 0,
                max: 100,
                message: "Discount must be a number between 0 and 100",
              },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={promotions} rowKey="id" />
    </div>
  );
};

export default Promotions;
