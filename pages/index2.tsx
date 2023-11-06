import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import LayoutBanner from "../src/components/commons/layout/banner/LayoutBanner.container";

const { Content, Sider } = Layout;

const icons = [UserOutlined, LaptopOutlined, NotificationOutlined];
const boardNames = ["자유 게시판", "여행지 추천", "회원관리"];

const items2 = icons.map((Icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: <Icon />,
    label: boardNames[index],
    children:
      index === 0
        ? [
            {
              key: "1",
              label: "게시글 작성",
              onClick: () =>
                (window.location.href = "http://localhost:3000/boards/new"),
            },
            {
              key: "2",
              label: "게시글 목록",
              onClick: () =>
                (window.location.href = "http://localhost:3000/boards"),
            },
            {
              key: "3",
              label: "추천 많은 글",
              onClick: () =>
                (window.location.href = "http://example.com/recommended"),
            },
          ]
        : index === 1
        ? [
            {
              key: "4",
              label: "여행지 리뷰 수정",
              onClick: () =>
                (window.location.href =
                  "http://localhost:3000/travel/recommend/recommend"),
            },
            {
              key: "5",
              label: "여행지 작성",
              onClick: () =>
                (window.location.href =
                  "http://localhost:3000/travel/create/write"),
            },
            {
              key: "5",
              label: "이용자 여행지 추천",
              onClick: () =>
                (window.location.href = "http://localhost:3000/travel_list"),
            },
          ]
        : new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
              key: subKey.toString(),
              label: `option${subKey}`,
            };
          }),
  };
});

export default function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
            borderRadius: "40px", // 둥근 모서리 설정
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0, borderRadius: "10px" }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: "0 0px 0px" }}>
          <Breadcrumb
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              textShadow: "4px 3px 4px #D8BFD8",
              display: "flex", // 추가된 부분
              justifyContent: "center", // 추가된 부분
              padding: "10px",
              // backgroundColor: "#f5f2fc", // 배경색 설정
              backgroundColor: "#F5F2F8", // 배경색 설정
              // borderTop: "1px dashed white", // 위쪽 구분선 설정
            }}
          >
            최근 올라온 사이트 여행 콘텐츠
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 650,
              backgroundImage: `url('backback.jpg')`, // 배경 이미지 경로를 적절히 수정해주세요.
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat", // 배경 이미지 반복 제어
              borderRadius: "20px",
            }}
          >
            {/* <LayoutBanner /> */}
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "59%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            ></div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
