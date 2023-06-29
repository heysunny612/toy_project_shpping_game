# 토이프로젝트 쇼핑 게임 

<p align="center">
    <img src="https://user-images.githubusercontent.com/127499117/235939191-c2253e09-e348-41e2-8f98-26a883c85c15.gif" alt="Animation12334">
</p>


> 아이템 data를 json파일로 정리해서, 비동기 처리를 통해 데이터를 불러오고, 화면을 구현했다. 비동기를 이해하기위해 콜백함수->프로미스->async를 순서대로 학습하고, 이해되지 않는 부분은 정말 여러번 반복하면서...코드는 작성할 수 있게 되었는데, 아직 100% 제대로 이해하지는 못한 상태이다. 비동기에 대해서는 익숙해질때까지 반복해서 내 것으로 만든 다음, 해당 글을 다시 한번 업데이트하겠다!...(곧...!!!!)

<br/>
<br/>

## 새로 배운 것들

 <br/>

```js
const getItems = async () => {
  const response = await fetch('./data/data.json');
  const data = await response.json();
  return data.items;
};

const init = async () => {
  try {
    const items = await getItems();
    const elements = displayItems(items);
    $items.append(...elements);
    $btns.addEventListener('click', (event) => onButtonClick(event, elements));
    $logo.addEventListener('click', () => init());
  } catch {
    console.log;
  }
};


```

## 1.async

- coming soon

 <br/>
 
 
 ```js
 
const displayItems = (items) => {
  $items.innerHTML = '';
  const elements = [];
  items.forEach((item) => {
    const { brand, name, color, image } = item;
    const $item = document.createElement('li');
    $item.dataset.brand = `${brand}`;
    $item.dataset.color = `${color}`;
    $item.className = `item show ${color.toLowerCase()}`;
    $item.innerHTML = `
      <span class="item_thumbnail">
        <img src="${image}" alt="${brand}" />
      </span>
      <span class="item_description"> ${brand} ,${name} ,${color} Lipstick</span>
    `;
    elements.push($item);
  });
  return elements;
};

const updateItems = (items, key, value) => {
  items.forEach((item) => {
    if (item.dataset[key] === value) {
      item.classList.add('show');
    } else {
      item.classList.remove('show');
    }
  });
};

```

 
## 2. data 어트리뷰트와 dataset 프로퍼티
- data 어트리뷰트와 dataset 프로퍼티를 사용하면, HTML 요소에 정의한 사용자 정의 어트리뷰트와 자바스크립트 간에 데이터를 교환할 수 있다. data 어트리뷰트는 data-user-id, data-role과 같이 data- 접두사 다음 임의의 이름을 붙여 사용한다.
- HTML 리스트 요소에 data-brand, data-color 라는 data 어트리뷰트를 동적으로 리스트를 생성할 때, 할당해주었고(key) 값으로는 각각의 리스트가 가지고 있는 브랜드와 컬러(value)를 넣어주었다. 이렇게 하여 아이템 리스트들 중  item.dataset[key]와 value가 일치한다면, 예를들어 아이템에 할당된 item.dataset[color] 의 값이 이벤트 타겟(버튼)의 dataset의 value(color)와 동일하다면, 그 리스트 요소에 show 클래스를 할당하여  보여질 수 있도록 하였다. 
