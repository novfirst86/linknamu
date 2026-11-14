export type Profile = {
  name: string;
  bio: string;
  /** public/ 아래 이미지 경로. 비워 두면 이름 첫 글자로 아바타를 그린다. */
  image?: string;
};

export type LinkItem = {
  /** 클릭 수 집계 키. 한 번 정하면 바꾸지 않는다. */
  id: string;
  label: string;
  url: string;
};

// TODO: 아래는 화면 확인용 더미 값이다. 실제 프로필과 링크로 교체할 것.
export const profile: Profile = {
  name: "홍길동",
  bio: "굽이진 길 끝에서 더 넓은 하늘을 만납니다",
  image: "/profile-rollercoaster.jpg",
};

export const links: LinkItem[] = [
  { id: "github", label: "GitHub", url: "https://github.com/" },
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/" },
  { id: "blog", label: "Blog", url: "https://example.com/" },
];
