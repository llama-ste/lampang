# [Lampang](https://llamaste.site)
<b>람팡은 쿠팡 파트너스* 기반의 어필리에이트 웹서비스 입니다.</b><br/>
<b>※ 유저가 람팡을 통해 쿠팡의 상품을 구매하면 람팡은 상품 금액의 약 3~10%의 수수료를 정산 받을 수 있어요.</b>

*쿠팡 파트너스 : 쿠팡에서 운영하는 온라인 제휴마케팅 서비스이며 홈페이지, 블로그, SNS 등을 사용하는 사람이라면 누구나 이용할 수 있어요. 쿠팡에서 판매되는 상품을 자신의 페이지에 노출하여 구매가 발생하면 광고비를 지급받을 수 있어요.

<p align="center">
<img src="https://user-images.githubusercontent.com/90495580/205214487-7b5db9c2-4c69-46ad-9248-d70c6dfeb42c.png" />
</p>

<br/>

## Userflow
<img src="https://user-images.githubusercontent.com/90495580/205214864-6d50b4ba-7ac7-4e68-8338-7b2f08a2d5f3.png"/>

<br/>

## Tech Stack
<b>Frontend(My Role)</b> : React, Recoil, React-query, React-beautiful-dnd, Mui <br/>
<b>Backend</b> : Express, PostgreSQL(supabase), Sequelize, Passport, Cheerio <br/>
<b>Infrastructure</b> : Vercel

<br/>

## Remarkable
### Infinite Scroll (Intersection Observer + React-query)
<b>Intersection Observer</b> <br/>
초기에 scroll event에 throttle를 이용해 무한스크롤을 만들었는데, 300ms마다 불필요한 이벤트를 호출한다는 생각이 들었다.<br/>
이러한 문제를 좀더 세련되게 만들 방법이 없나 찾아보던 중 intersection observer를 알게 되었다. <br/>
해당 Web API는 루트 요소와 타겟 요소의 교차점을 관찰하여 교차시 비동기적으로 실행되고 reflow를 발생시키지 않는다는것을 알게되어 선택하게 되었다.<br/>

<br/>

<b>useInfiniteQuery (React-query)</b><br/>
API의 파라미터 값만 변경하여 아주 간단하게 동일한 API를 계속 호출할 수 있다. <br/>
해당 훅을 호출할 경우 data, hasNextPage, fetchNextPage() 등 무한 스크롤에 필요한 모든 정보가 반환되기 때문에
Intersection Observer와 찰떡궁합이라 선택하게 되었다. <br/>
_🚨 cacheTime을 변경하지 않으면 캐시된 시간동안 다른페이지를 다녀올 경우 그전에 받아온 모든 페이지를 다시 fetch하는것에 유의해야한다._


<br/>

<b>Custom Hook</b><br/>
추후에도 무한 스크롤또는 레이지 로딩등을 이용할 경우, 손쉽게 재사용 할 수 있게 커스텀훅으로 만들어보았다.

<details>
<summary><b>Intersection Observer Custom Hook Code</b></summary>
<div markdown="1">    

```javascript
import { useEffect } from "react";

const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = "0px",
  enabled = true,
}) => {
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => (
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
        {
          // 루트가 없다면, 브라우저 뷰포트가 기본값으로 설정된다.
          root: root && root.current,
          rootMargin,
          threshold,
        }
      )
    );

    const currentTarget = target && target.current;

    if (!currentTarget) return;
    observer.observe(currentTarget);

    return () => observer.unobserve(currentTarget);
  }, [target, onIntersect, root, rootMargin, threshold, enabled]);
};

export default useIntersectionObserver;
```

</div>
</details>

<br/>

### Draggable List
<b>문제</b><br/>
React-beautiful-dnd를 이용하여 Draggable List를 구현하였는데, React18버전에서 애니메이션이 동작하지 않는 문제가 발생했다.<br/>

<b>원인</b><br/>
원인은 해당 라이브러리는 useLayoutEffect내부에서 droppable이 등록되는데 첫 componentDidMount에서는 실행되지만 컴포넌트가 다시 마운트될때는 실행되지 않아서 발생하는 문제였다.<br/>

<b>해결</b><br/>
해당 문제는 React StrictMode를 제거하면 쉽게 해결 되긴하지만 올바른 방법같지는 않아서 다른방법을 찾아보았다.<br/>
검색해본 결과 <b>[requestAnimationFrame](https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame)</b>라는 WebAPI를 찾아볼수 있었다.<br/>
requestAnimationFrame는 다음 리페인트 과정이 시작되기전 원하는 애니메이트를 만들어줄 콜백이 실행되는 API인데, 이 문제에 이용한 결과 정상동작 하였다.<br/>
<b>Link : [Github Issue](https://github.com/atlassian/react-beautiful-dnd/issues/2399)</b>


<details>
<summary><b>StrictMode Droppable Code</b></summary>
<div markdown="1">

```javascript
import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

export default StrictModeDroppable;

```

</div>
</details>

<p align="center">
<img src="https://user-images.githubusercontent.com/90495580/205236509-cd6f9c8a-7773-4d5e-8850-e41c86eaf6f0.gif" />
</p>

<br/>

### Responsive Web
<img src="https://user-images.githubusercontent.com/90495580/205828053-a7aca10f-8d5d-438f-af95-a8b7bdae9e73.png" />

<br/>

### 쿠팡 API 연동
<p align="center">
<img src="https://user-images.githubusercontent.com/90495580/205235323-8de4e946-fd62-4af5-a049-2479e7b6f6af.png" />
</p>

<b>HMAC</b> : 해시 메시지 인증코드(Hash Message Authentication Code)의 준말로써 RFC2104 표준 암호화 프로토콜이다. 파트너스 API는 HMAC기반으로 제작되었으며 모든 request header의 Authorization에 생성한 HMAC signature를 함께 보내야한다.<br>

<br/>

## 📌한 줄 회고 (feat.작고 귀여운 나의 수익)
> 조그마한 수익이라도 낼 수 있는 프로젝트를 만들어보니 개발이 점점 더 흥미롭게 다가오는것 같다.

<img src="https://velog.velcdn.com/images/llama/post/0fc89b10-769f-4fd7-9975-8d75836c2983/image.png" />
