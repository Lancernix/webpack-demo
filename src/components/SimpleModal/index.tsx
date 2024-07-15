import { Button, Modal } from 'antd';
import React, { useState } from 'react';

const SimpleModal = () => {
  const [open, setOpen] = useState(false);

  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);

  console.log(1);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        点击打开弹窗
      </Button>
      <Modal title="弹窗" visible={open} onOk={handleOk} onCancel={handleCancel}>
        {[1, 2, 3, 4].map((item) => (
          <p key={item}>Some contents...</p>
        ))}
      </Modal>
    </>
  );
};

export default SimpleModal;
