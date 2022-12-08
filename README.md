# Redux Toolkit

### 설치

```powershell
# NPM
npm install @reduxjs/toolkit

#Yarn
yarn add @reduxjs/toolkit
```

redux toolkit을 사용한다면 redux는 삭제해야 한다. 

왜냐하면 그건 이미 Redux Toolkit에 포함되어 있기 때문이다. 

### 사용법

```jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = { counter : 0, showCounter: true}

const counterSlice = createSlice({
    name : 'counter',
    initialState,
    reducers : {
        increment(state){
            state.counter++;
        },
        decrement(state){
            state.counter--;
        },
        increase(state, action){
            state.counter = state.counter + action.amount;
        },
        toggleCounter(state){
            state.showCounter = !state.showCounter;
        }
    } 

})

const store = configureStore({
    reducer : counterSlice.reducer
})

export const counterActions = counterSlice.actions; 
export default store;
```

1. 설치된 redux toolkit 패키지에서 createReducer나 createSlice 등을 쓸수 있는데 createSlice를 쓰는 이유는 한번에 몇가지를 단순화할 수 있어서 createReducer보다 강력합니다. 
2. import한 createSlice를 호출합니다. createSlice는 객체를 인자로서 생성합니다.  
이제 이 createSlice를 가지고 전역 상태의 slice를 미리 만들어놔야합니다. 
서로 직접적인 관계가 아닌, 상태가 여러 조각으로 나뉘어 있다면요
인증 상태와 카운터 상태가 있다고 가정해봅시다.
- 1) 모든 slice는 이름이 있어야합니다.  말하자면 상태마다 식별자가 필요한 것이다. 
ex) name : ‘counter’
- 2) 초기 상태를 설정해야합니다.
ex) initialState : {counter : 0, showCounter : true}
- 3) 리듀서를 추가해야합니다. 리듀서는 객체 혹은 맵이라 할 수 있는데 이 안에 메서드를 넣는다.
ex) reducers : {
        increment(state){
            state.counter++;
        },
        decrement(state){
            state.counter--;
        },
        increase(state, action){
            state.counter = state.counter + action.amount;
        },
        toggleCounter(state){
            state.showCounter = !state.showCounter;
        }
    }

reducers의 메서드를은 자동으로 최근 값을 받는다. 
이 메서드들은 나중에 리덕스에 의해 호출되고 현재 상태를 받는다, 

그리고 어떤 액션을 했느냐에 따라 메서드가 자동으로 호출된다. 

그래서 더 이상 일반적인 redux처럼 if문을 작성할 필요가 없다,

그리고 state.counter++; 처럼 기존 상태를 직접적으로 바꾸는 것처럼 보이지만 

이것은 Redux Toolkit 이 내부적으로 immer라는 다른 패키지를 사용하는데 이런 코드를 감지하고

자동으로 원래 있는 상태를 복제합니다. 그리고 새로운 상태 객체를 생성하고 모든 상태를 변경할 수 없게 한 다음 우리가 변경한 상태는 변하지 않도록 오버라이드합니다. 이

이렇게 slice를 생성해보았다. 이제 store가 이 slice를 어떻게 알 수 있을까…???

slice를 어떤 식으로 사용해야 할까???

이 slice에 액션을 어떻게 보내야 할까???

1. createSlice의 반환값을 변수에 넣고 이걸 store에 등록해줘야한다. 
일반적인 redux에서는 createStore에 slice의 reducer를 넣을 수 있다.
하지만 애플리케이션이 커지고 전달해야 하는 상태가 많아진다면 불편해진다. 
그래서 redux Toolkit에서는 configureStore를 제공한다. 
configureStore는 여러 개의 리듀서를 하나의 리듀서로 쉽게 합칠 수 있다.
