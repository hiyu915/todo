import { useState } from "react";

type Todo = {
  id: string;
  title: string;
};

function App() {
  // 追加されたTodoの一覧
  const [todos, setTodos] = useState<Todo[]>([]);
  // 入力欄に今打ってる文字
  const [input, setInput] = useState("");

  return (
    <div>
      <h1>Todo</h1>

      <form
        onSubmit={(e) => {
          // デバッグ用
          // console.log(e);

          // preventDefault：<form>は本来、送信されると入力内容をサーバーに送り、その結果のページに遷移する動きをする。
          // 送信先(action)を書いていなければ今のページに送るので、ページの再読み込みになり、今回の場合入力した値が空になる。
          // 関数の最初に置くのが定番。「このあと標準動作をやらないで」という印を付けておくもの。
          e.preventDefault();
          // trim()で前後の空白を省き、入力文字が空白ならreturn
          if (input.trim() === "") return;
          const newTodo: Todo = {
            // randomUUID() は Crypto インターフェイスのメソッドで、暗号強度の強い乱数生成器を用いて v4 UUID を生成するのに用いられる。
            id: crypto.randomUUID(),
            title: input.trim(),
          };
          // (...)はスプレッド構文。配列の中身を1個ずつ展開する。
          setTodos([...todos, newTodo]);
          setInput("");
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="やることを入力"
        />
        <button type="submit">追加</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
