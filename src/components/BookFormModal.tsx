import React, { useState } from 'react';
import styled from 'styled-components';
import { X, Sparkles } from 'lucide-react';
import type { Book } from '../types/Book';

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
  bookToEdit: Book | null;
  existingIds: string[];
}

export const BookFormModal: React.FC<BookFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  bookToEdit,
  existingIds,
}) => {
  const currentYear = new Date().getFullYear();
  const today = new Date().toISOString().split('T')[0];

  const [id, setId] = useState(bookToEdit?.id ?? '');
  const [titulo, setTitulo] = useState(bookToEdit?.titulo ?? '');
  const [autor, setAutor] = useState(bookToEdit?.autor ?? '');
  const [anoPublicacao, setAnoPublicacao] = useState(
    bookToEdit ? String(bookToEdit.anoPublicacao) : ''
  );
  const [dataCadastro, setDataCadastro] = useState(bookToEdit?.dataCadastro ?? today);
  const [genero, setGenero] = useState(bookToEdit?.genero ?? '');
  const [descricao, setDescricao] = useState(bookToEdit?.descricao ?? '');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !id.trim() ||
      !titulo.trim() ||
      !autor.trim() ||
      !anoPublicacao.trim() ||
      !dataCadastro.trim() ||
      !genero.trim() ||
      !descricao.trim()
    ) {
      setError('Todos os campos mágicos são obrigatórios!');
      return;
    }

    if (!bookToEdit && existingIds.includes(id.trim())) {
      setError('Já existe um livro encantado com este ID na estante.');
      return;
    }

    const yearNumber = Number(anoPublicacao);
    if (isNaN(yearNumber) || yearNumber > currentYear) {
      setError(`O ano de publicação não pode ser no futuro (máximo: ${currentYear}).`);
      return;
    }

    onSave({
      id: id.trim(),
      titulo: titulo.trim(),
      autor: autor.trim(),
      anoPublicacao: yearNumber,
      dataCadastro,
      genero: genero.trim(),
      descricao: descricao.trim(),
    });

    onClose();
  };

  return (
    <Overlay>
      <ModalCard>
        <Header>
          <h2>
            <Sparkles size={20} color="#9c6b30" />
            {bookToEdit ? 'Editar Encantamento' : 'Novo Livro Mágico'}
          </h2>
          <CloseBtn onClick={onClose}>
            <X size={20} />
          </CloseBtn>
        </Header>

        {error && <ErrorBox>{error}</ErrorBox>}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Field>
              <label>ID do Tomo *</label>
              <input
                type="text"
                placeholder="Ex: LIV-004"
                value={id}
                onChange={(e) => setId(e.target.value)}
                disabled={!!bookToEdit}
              />
            </Field>

            <Field>
              <label>Data de Cadastro *</label>
              <input
                type="date"
                value={dataCadastro}
                onChange={(e) => setDataCadastro(e.target.value)}
                disabled={!!bookToEdit}
              />
            </Field>
          </Row>

          <Field>
            <label>Título do Livro *</label>
            <input
              type="text"
              placeholder="Ex: O Sussurro das Páginas Antigas"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </Field>

          <Row>
            <Field>
              <label>Autor(a) *</label>
              <input
                type="text"
                placeholder="Ex: Mestre Aldebaran"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
              />
            </Field>

            <Field>
              <label>Ano de Publicação *</label>
              <input
                type="number"
                placeholder={`Até ${currentYear}`}
                value={anoPublicacao}
                onChange={(e) => setAnoPublicacao(e.target.value)}
              />
            </Field>
          </Row>

          <Field>
            <label>Gênero Mágico *</label>
            <input
              type="text"
              placeholder="Ex: Alquimia, Contos Noturnos, Feitiçaria..."
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            />
          </Field>

          <Field>
            <label>Personalidade & Breve Descrição *</label>
            <textarea
              rows={3}
              placeholder="Descreva a personalidade, desejos e história deste livro..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </Field>

          <Actions>
            <CancelBtn type="button" onClick={onClose}>
              Cancelar
            </CancelBtn>
            <SaveBtn type="submit">
              {bookToEdit ? 'Salvar Alterações' : 'Adicionar à Estante'}
            </SaveBtn>
          </Actions>
        </Form>
      </ModalCard>
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

const ModalCard = styled.div`
  background: #fffdf9;
  border: 1px solid #e4d7c5;
  border-radius: 16px;
  width: 100%;
  max-width: 540px;
  padding: 1.75rem;
  box-shadow: 0 20px 45px rgba(44, 36, 30, 0.18);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #efe5d8;

  h2 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    color: #4a3525;
  }
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: #7c6855;
  display: flex;
  padding: 0.25rem;
  border-radius: 8px;

  &:hover {
    background: #f3ece1;
    color: #2c241e;
  }
`;

const ErrorBox = styled.div`
  background: #fdecea;
  color: #a62626;
  border: 1px solid #f5c2c0;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  label {
    font-size: 0.82rem;
    font-weight: 600;
    color: #5c4938;
  }

  input,
  textarea {
    padding: 0.65rem 0.85rem;
    border-radius: 10px;
    border: 1px solid #dccbb5;
    background: #faf6f0;
    color: #2c241e;
    font-size: 0.92rem;
    font-family: inherit;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: #9c6b30;
      background: #ffffff;
    }

    &:disabled {
      background: #ece4d8;
      color: #8b7968;
      cursor: not-allowed;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const CancelBtn = styled.button`
  padding: 0.65rem 1.15rem;
  border-radius: 10px;
  border: 1px solid #dccbb5;
  background: transparent;
  color: #5c4938;
  font-weight: 500;

  &:hover {
    background: #f3ece1;
  }
`;

const SaveBtn = styled.button`
  padding: 0.65rem 1.25rem;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #7c4d25 0%, #9c6b30 100%);
  color: #fffdf9;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(124, 77, 37, 0.25);

  &:hover {
    filter: brightness(1.06);
  }
`;