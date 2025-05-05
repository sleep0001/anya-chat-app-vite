// import { Button, Space } from 'antd';
// import { fetchRooms } from '../../hooks/Reload';
// import { useContexts } from '../../contexts/contexts'
// import { requestMessage } from '../../hooks/useWebSocket';
// import { useWebSocket } from '../../hooks/useWebSocket';
// const CuteButtons = () => {
//     const {
//         setRoomIds,
//         entryRoomId
//     } = useContexts();
//     const { connectionStatus, sendMessage } = useWebSocket();
//     const createRequest: requestMessage = {
//         type: "create",
//     }
//     return (
//         <Space wrap>
//             <Button
//                 type="primary"
//                 shape="round"
//                 size="large"
//                 style={{
//                     backgroundColor: '#ff85c0', // ピンク色
//                     border: 'none',
//                     boxShadow: '0 4px 10px rgba(255,133,192,0.3)',
//                 }}
//                 onClick={() => sendMessage(createRequest)}
//             >
//                 ルーム作成
//             </Button>

//             <Button
//                 type="default"
//                 shape="round"
//                 size="large"
//                 style={{
//                     color: '#ff85c0',
//                     borderColor: '#ffadd2',
//                 }}
//                 onClick={() => fetchRooms(setRoomIds)}
//             >
//                 更新
//             </Button>
//         </Space>
//     );
// };

// export default CuteButtons;
