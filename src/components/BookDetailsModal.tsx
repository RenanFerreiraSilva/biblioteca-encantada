import React from 'react';
import styled from 'styled-components';
import { X, BookOpen, Calendar, Hash, Tag, User, Sparkles } from 'lucide-react';
import type { Book } from '../types/Book';

interface BookDetailsModalProps {
  book: Book | null;
  onClose: () => void;
}

export const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <Overlay onClick={onClose}>
      <Card onClick={(e) => e.stopPropagation()}>
        <Header>
          <Badge>
            <Sparkles size={14} /> Tomo Encantado
          </Badge>
          <CloseBtn onClick={onClose}>
            <X size={20} />
          </CloseBtn>
        </Header>

        <Title>{book.titulo}</Title>

        <MetaGrid>
          <MetaItem>
            <Hash size={16} />
            <div>
              <span>ID</span>
              <strong>{book.id}</strong>
            </div>
          </MetaItem>

          <MetaItem>
            <User size={16} />
            <div>
              <span>Autor(a)</span>
              <strong>{book.autor}</strong>
            </div>
          </MetaItem>

          <MetaItem>
            <BookOpen size={16} />
            <div>
              <span>Publicação</span>
              <strong>{book.anoPublicacao}</strong>
            </div>
          </MetaItem>

          <MetaItem>
            <Tag size={16} />
            <div>
              <span>Gênero</span>
              <strong>{book.genero}</strong>
            </div>
          </MetaItem>

          <MetaItem>
            <Calendar size={16} />
            <div>
              <span>Cadastrado em</span>
              <strong>{new Date(book.dataCadastro + 'T00:00:00').toLocaleDateString('pt-BR')}</strong>
            </div>
          </MetaItem>
        </MetaGrid>

        <DescriptionBox>
          <h4>Personalidade & História</h4>
          <p>{book.descricao}</p>
        </DescriptionBox>
      </Card>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(34, 24, 16, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 100;
`;

const Card = styled.div`
  background: #fffdf9;
  border: 1px solid #e4d7c5;
  border-radius: 18px;
  width: 100%;
  max-width: 500px;
  padding: 1.75rem;
  box-shadow: 0 20px 45px rgba(44, 36, 30, 0.2);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: #f4ead8;
  color: #8a5a24;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: #7c6855;
  padding: 0.25rem;
  border-radius: 8px;

  &:hover {
    background: #f3ece1;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #3b2818;
  margin-bottom: 1.25rem;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
  margin-bottom: 1.25rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: #faf5ed;
  padding: 0.7rem 0.85rem;
  border-radius: 12px;
  border: 1px solid #ede2d2;
  color: #8a5a24;

  div {
    display: flex;
    flex-direction: column;

    span {
      font-size: 0.72rem;
      color: #8b7968;
    }

    strong {
      font-size: 0.88rem;
      color: #2c241e;
    }
  }
`;

const DescriptionBox = styled.div`
  background: #f7f1e6;
  padding: 1rem 1.15rem;
  border-radius: 12px;
  border-left: 4px solid #9c6b30;

  h4 {
    font-size: 0.85rem;
    color: #6e4a23;
    margin-bottom: 0.4rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  p {
    font-size: 0.94rem;
    line-height: 1.55;
    color: #3d3128;
  }
`;