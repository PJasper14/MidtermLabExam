import { io, Socket } from 'socket.io-client';
import { Order } from '../types';

// Create a singleton instance of the socket
let socket: Socket | null = null;

// Initialize the socket connection
export const initializeSocket = () => {
  if (!socket) {
    // Replace with your backend WebSocket server URL
    socket = io('http://127.0.0.1:8000/');
    
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    
    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }
  return socket;
};

// Subscribe to new orders
export const subscribeToNewOrders = (callback: (order: Order) => void) => {
  const socket = initializeSocket();
  
  socket.on('newOrder', (order: Order) => {
    callback(order);
  });
  
  return () => {
    socket.off('newOrder');
  };
};

// Clean up socket connection
export const cleanupSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}; 