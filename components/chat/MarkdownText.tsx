// components/chat/MarkdownText.tsx
import React from 'react';
import { Text, View } from 'react-native';

interface Segment {
  type: 'bold' | 'italic' | 'text' | 'bullet' | 'newline';
  content: string;
  indent?: number;
}

/**
 * Lightweight markdown → React Native text renderer.
 * Handles: **bold**, *italic*, - bullet lists, \n newlines.
 * No external dependencies required.
 */

function parseInline(text: string): { bold: boolean; italic: boolean; content: string }[] {
  const result: { bold: boolean; italic: boolean; content: string }[] = [];
  // Match **bold**, *italic*, or plain text
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Plain text before this match
    if (match.index > lastIndex) {
      result.push({ bold: false, italic: false, content: text.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined) {
      result.push({ bold: true, italic: false, content: match[1] });
    } else if (match[2] !== undefined) {
      result.push({ bold: false, italic: true, content: match[2] });
    }
    lastIndex = regex.lastIndex;
  }

  // Remaining plain text
  if (lastIndex < text.length) {
    result.push({ bold: false, italic: false, content: text.slice(lastIndex) });
  }

  return result;
}

interface InlineTextProps {
  text: string;
  baseColor: string;
  fontSize?: number;
}

function InlineText({ text, baseColor, fontSize = 14 }: InlineTextProps) {
  const parts = parseInline(text);
  return (
    <>
      {parts.map((p, i) => (
        <Text
          key={i}
          style={{
            fontFamily: p.bold ? 'Outfit-SemiBold' : p.italic ? 'Outfit-Italic' : 'Outfit-Regular',
            fontSize,
            color: baseColor,
            lineHeight: fontSize * 1.55,
          }}>
          {p.content}
        </Text>
      ))}
    </>
  );
}

interface MarkdownTextProps {
  content: string;
  color?: string;
  fontSize?: number;
}

export function MarkdownText({ content, color = '#2E2117', fontSize = 14 }: MarkdownTextProps) {
  // Split into lines and render each appropriately
  const lines = content.split('\n');

  return (
    <View style={{ gap: 2 }}>
      {lines.map((line, i) => {
        const trimmed = line.trim();

        // Empty line → spacer
        if (!trimmed) {
          return <View key={i} style={{ height: 6 }} />;
        }

        // Bullet line: starts with - or •
        if (/^[-•]\s/.test(trimmed)) {
          const bulletContent = trimmed.replace(/^[-•]\s/, '');
          return (
            <View
              key={i}
              style={{ flexDirection: 'row', paddingLeft: 8, alignItems: 'flex-start' }}>
              <Text
                style={{
                  color,
                  fontSize,
                  fontFamily: 'Outfit-Regular',
                  lineHeight: fontSize * 1.55,
                  marginRight: 6,
                }}>
                {'•'}
              </Text>
              <Text style={{ flex: 1 }}>
                <InlineText text={bulletContent} baseColor={color} fontSize={fontSize} />
              </Text>
            </View>
          );
        }

        // Regular line
        return (
          <Text key={i} style={{ flexWrap: 'wrap' }}>
            <InlineText text={trimmed} baseColor={color} fontSize={fontSize} />
          </Text>
        );
      })}
    </View>
  );
}
