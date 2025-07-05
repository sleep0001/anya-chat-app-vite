// グラフの実装には過去時点でのポイントを取得できるようにバックエンドの改修が必要。
// 一旦表を優先する。
// import {
//     LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend,
// } from 'recharts';

// const RankingGraph: React.FC<Props> = () => {
//     return (
//         <div style={{ width: '100%', height: 400 }}>
//             <h3>プレイヤー別ポイント推移</h3>
//             <ResponsiveContainer>
//                 <LineChart data={data}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     {playerNames.map((name, index) => (
//                         <Line
//                             key={name}
//                             type="monotone"
//                             dataKey={name}
//                             stroke={colors[index % colors.length]}
//                             dot={false}
//                         />
//                     ))}
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }

// export default RankingGraph;

// type TimePoint = {
//     date: string; // 例: '2025-07-01'
//     [playerName: string]: number | string; // 'taro': 1500, 'jiro': 1600 など
// };

// interface Props {
//     data: TimePoint[];
//     playerNames: string[];
// }

// const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];