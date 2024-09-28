import React, { useState, useEffect } from "react";
import { Form, Button, Input, Card, Row, Tag } from "antd";
import "./App.css";
import { getDataListTrips } from "./services/tripsService";

function App() {
  const [count, setCount] = useState(0);
  const [form] = Form.useForm();
  const [dataList, setDataList] = useState<any>([]);

  const onClick = async (item: any) => {
    const response = await getDataListTrips(item);
    if (response != null) {
      setDataList(response);
    } else {
      console.log("error");
    }
  };

  const getList = async () => {
    const response = await getDataListTrips(null);
    if (response != null) {
      setDataList(response);
    } else {
      console.log("error");
    }
  };

  const onSearch = async (fileNameSelect: string) => {
    const response = await getDataListTrips(fileNameSelect);
    if (response != null) {
      setDataList(response);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      <div className="mt-5 w-full">
        <h1 className="mt-20 text-center text-cyan-500 font-bold text-2xl">เที่ยวไหนดี</h1>
        <Form
          name="basic"
          form={form}
          initialValues={{
            remember: true,
          }}
        >
          <div className="flex justify-center">
            <Form.Item name={"fileNameSelect"}>
              <Input.Search
                placeholder="หาที่เที่ยวแล้วไปกัน..."
                onSearch={onSearch}
                allowClear
              />
            </Form.Item>
          </div>
          <div className="flex justify-center flex-col items-center">
            {dataList?.map((item, index) => (
              <Card
                hoverable
                // style={{ width: "80%", margin: "10px 0" }}
                key={index}
                className="w-full max-w-4xl min-w-24"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1 ">
                    <img
                      className="rounded-lg max-w-full h-full max-h-full min-h-24"
                      // alt="example"
                      src={item.photos[0]}
                    />
                  </div>
                  <div className="col-span-1">
                    <div>
                      <a href={item.url} target="_blank" className="font-bold text-2xl ">
                        {item.title}
                      </a>
                    </div>
                    <div>
                      <div className="text-gray-600 mt-2">
                        {item.description}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 cursor-pointer ml-1"
                        >
                          ...อ่านต่อ
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      หมวดหมู่:
                      {item.tags.map((tag) => (
                        <span
                          
                          onClick={() => onClick(tag)} // เพิ่ม Event สำหรับจัดการคลิกบน Tag
                          className="cursor-pointer underline"
                        >
                          <p>{tag}</p>
                        </span>
                      ))}
                    </div>
                    <div className="hidden md:grid grid-cols-3 gap-2">
                      {item.photos.map((img) => (
                        <div className="col-span-1">
                          <img className="rounded-lg w-full h-auto object-cover rounded" alt="example" src={img} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Form>
      </div>
    </>
  );
}

export default App;
