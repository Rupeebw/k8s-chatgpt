import { Component, OnInit } from '@angular/core';
import { supabase } from '../supabaseClient'; // Make sure this path is correct

interface Message {
  id?: number;
  created_at?: string;
  sender: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    this.loadMessages();
  }

  async loadMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      this.messages = data || [];
    }
  }

  async sendMessage() {
    if (this.newMessage.trim() === '') return;

    // Insert user message into database
    const { data: userData, error: userError } = await supabase
      .from('messages')
      .insert({ sender: 'user', text: this.newMessage })
      .select();

    if (userError) {
      console.error('Error sending user message:', userError);
      return;
    }

    // Add user message to local array
    if (userData) {
      this.messages.push(userData[0]);
    }

    // Clear input field
    const userMessage = this.newMessage;
    this.newMessage = '';

    // Get bot response (you'll need to implement this)
    const botResponse = await this.getBotResponse(userMessage);

    // Insert bot message into database
    const { data: botData, error: botError } = await supabase
      .from('messages')
      .insert({ sender: 'ai', text: botResponse })
      .select();

    if (botError) {
      console.error('Error sending bot message:', botError);
      return;
    }

    // Add bot message to local array
    if (botData) {
      this.messages.push(botData[0]);
    }
  }

  async getBotResponse(message: string): Promise<string> {
    // TODO: Implement actual API call to get bot response
    // For now, we'll just return a simulated response
    return `This is a simulated AI response to: "${message}"`;
  }
}