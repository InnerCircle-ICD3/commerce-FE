const { WebSocketServer } = require("ws");
const { randomUUID } = require("node:crypto");

class GroupChatServer {
    constructor() {
        this.wss = new WebSocketServer({ port: 8080 });
        this.clients = new Map(); // 연결된 모든 클라이언트
        this.messages = []; // 전체 메시지 기록
        this.MAX_MESSAGES = 500; // 최대 메시지 개수
        this.setupServer();

        console.log("💬 그룹 채팅 서버가 ws://localhost:8080에서 실행 중입니다");
    }

    setupServer() {
        this.wss.on("connection", ws => {
            console.log("새로운 사용자 연결");

            ws.on("message", data => {
                try {
                    const message = JSON.parse(data.toString());
                    const { type, data: payload } = message;

                    // 간단한 검증 추가
                    if (type === "join" && typeof payload?.userName === "string" && payload.userName.length <= 50) {
                        this.handleMessage(ws, message);
                    } else if (
                        type === "sendMessage" &&
                        typeof payload?.message === "string" &&
                        payload.message.trim().length > 0 &&
                        payload.message.length <= 500
                    ) {
                        this.handleMessage(ws, message);
                    } else {
                        ws.send(JSON.stringify({ error: "INVALID_PAYLOAD" }));
                    }
                } catch (error) {
                    console.error("메시지 파싱 오류:", error);
                }
            });

            ws.on("close", () => {
                this.handleDisconnection(ws);
            });
        });
    }

    handleMessage(ws, message) {
        const { type, data } = message;

        switch (type) {
            case "join":
                this.handleJoin(ws, data);
                break;
            case "sendMessage":
                this.handleSendMessage(ws, data);
                break;
            default:
                console.log("알 수 없는 메시지 타입:", type);
        }
    }

    handleJoin(ws, data) {
        const { userName } = data;
        const userId = randomUUID();

        const userInfo = {
            id: userId,
            name: userName,
            ws: ws,
            connectedAt: new Date().toISOString(),
        };

        this.clients.set(userId, userInfo);
        ws.userInfo = userInfo; // 역참조 저장
        console.log(`${userName} 입장 (총 ${this.clients.size}명)`);

        // 입장 메시지를 모든 사용자에게 브로드캐스트
        const joinMessage = {
            id: randomUUID(),
            sender: "시스템",
            message: `${userName}님이 입장했습니다`,
            timestamp: new Date().toISOString(),
            type: "system",
        };

        this.broadcastMessage(joinMessage);
        this.addMessage(joinMessage);
    }

    handleSendMessage(ws, data) {
        const { message: messageText } = data;

        // 발신자 찾기
        const senderName = ws.userInfo?.name ?? "익명";

        // 메시지 생성
        const message = {
            id: randomUUID(),
            sender: senderName,
            message: messageText,
            timestamp: new Date().toISOString(),
            type: "user",
        };

        console.log(`${senderName}: ${messageText}`);

        // 모든 클라이언트에게 메시지 브로드캐스트
        this.broadcastMessage(message);
        this.addMessage(message);
    }

    handleDisconnection(ws) {
        // 연결 해제된 사용자 찾기 및 제거
        for (const [id, info] of this.clients.entries()) {
            if (info.ws === ws) {
                console.log(`${info.name} 퇴장 (총 ${this.clients.size - 1}명)`);

                // 퇴장 메시지를 다른 사용자들에게 브로드캐스트
                const leaveMessage = {
                    id: randomUUID(),
                    sender: "시스템",
                    message: `${info.name}님이 퇴장했습니다`,
                    timestamp: new Date().toISOString(),
                    type: "system",
                };

                this.clients.delete(id);
                this.broadcastMessage(leaveMessage);
                this.addMessage(leaveMessage);
                break;
            }
        }
    }

    broadcastMessage(message) {
        const messageData = {
            type: "message",
            data: message,
        };

        for (const [id, info] of this.clients.entries()) {
            if (info.ws.readyState === 1) {
                // WebSocket.OPEN
                info.ws.send(JSON.stringify(messageData));
            }
        }
    }

    addMessage(message) {
        this.messages.push(message);
        if (this.messages.length > this.MAX_MESSAGES) {
            this.messages.shift(); // 가장 오래된 메시지 삭제
        }
    }
}

// 서버 시작
const chatServer = new GroupChatServer();

// 프로세스 종료 처리
const gracefulShutdown = () => {
    console.log("\n채팅 서버를 종료합니다...");
    chatServer.wss.close(() => process.exit(0));
};
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
