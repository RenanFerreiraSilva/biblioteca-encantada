import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  BookOpen,
  Plus,
  Search,
  Eye,
  Edit3,
  Trash2,
  Sparkles,
  Library,
} from 'lucide-react';
import type { Book } from './types/Book';
import { GlobalStyles } from './styles/GlobalStyles';
import { BookFormModal } from './components/BookFormModal';
import { BookDetailsModal } from './components/BookDetailsModal';

const INITIAL_BOOKS: Book[] = [
  {
    id: 'LIV-001',
    titulo: 'O Grimório das Estrelas Cadentes',
    autor: 'Celeste Valmont',
    anoPublicacao: 1894,
    dataCadastro: '2026-11-10',
    genero: 'Astronomia Mística',
    descricao:
      'Um livro vaidoso que gosta de ser lido apenas à luz de velas e solta pequenas faíscas douradas quando recebe elogios.',
  },
  {
    id: 'LIV-002',
    titulo: 'Crônicas do Chá de Camomila',
    autor: 'Arthur Pendelton',
    anoPublicacao: 1952,
    dataCadastro: '2026-11-15',
    genero: 'Contos Aconchegantes',
    descricao:
      'Calmo e acolhedor, adora ficar perto da janela observando a chuva e exala um suave aroma de ervas frescas à noite.',
  },
  {
    id: 'LIV-003',
    titulo: 'O Atlas dos Caminhos Esquecidos',
    autor: 'Helena Vance',
    anoPublicacao: 2011,
    dataCadastro: '2026-11-20',
    genero: 'Aventura & Cartografia',
    descricao:
      'Inquieto e curioso, muda os mapas de suas páginas toda madrugada se ficar muitos dias sem ser folheado.',
  },
];

export function App() {
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('@livropolis:books');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    localStorage.setItem('@livropolis:books', JSON.stringify(books));
  }, [books]);

  const handleOpenAdd = () => {
    setBookToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (book: Book) => {
    setBookToEdit(book);
    setIsFormOpen(true);
  };

  const handleSaveBook = (savedBook: Book) => {
    if (bookToEdit) {
      setBooks((prev) =>
        prev.map((item) => (item.id === savedBook.id ? savedBook : item))
      );
    } else {
      setBooks((prev) => [savedBook, ...prev]);
    }
  };

  const handleDeleteBook = (book: Book) => {
    const confirmed = window.confirm(
      `Dona Clara, tem certeza de que deseja remover "${book.titulo}" da Biblioteca Encantada? Ele pode sentir saudades!`
    );

    if (confirmed) {
      setBooks((prev) => prev.filter((item) => item.id !== book.id));
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.autor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          <Brand>
            <IconCircle>
              <Library size={28} />
            </IconCircle>
            <div>
              <h1>Biblioteca Encantada de Livrópolis</h1>
              <p>Acervo mágico sob os cuidados de Dona Clara</p>
            </div>
          </Brand>

          <AddButton onClick={handleOpenAdd}>
            <Plus size={18} />
            Cadastrar Novo Livro
          </AddButton>
        </Header>

        <Toolbar>
          <SearchBox>
            <Search size={18} color="#8b7968" />
            <input
              type="text"
              placeholder="Pesquisar livro mágico por título ou autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>

          <Counter>
            <Sparkles size={16} />
            <span>
              {filteredBooks.length}{' '}
              {filteredBooks.length === 1 ? 'livro encantado' : 'livros encantados'}
            </span>
          </Counter>
        </Toolbar>

        {filteredBooks.length === 0 ? (
          <EmptyState>
            <BookOpen size={44} color="#b59e84" />
            <h3>Nenhum livro encontrado na estante</h3>
            <p>Tente buscar por outro nome ou cadastre um novo tomo mágico.</p>
          </EmptyState>
        ) : (
          <Grid>
            {filteredBooks.map((book) => (
              <BookCard key={book.id}>
                <CardTop>
                  <YearTag>{book.anoPublicacao}</YearTag>
                  <IdTag>{book.id}</IdTag>
                </CardTop>

                <BookTitle>{book.titulo}</BookTitle>
                <BookAuthor>por {book.autor}</BookAuthor>

                <CardActions>
                  <ActionBtn
                    variant="details"
                    onClick={() => setSelectedBook(book)}
                    title="Ver mais detalhes"
                  >
                    <Eye size={16} />
                    Detalhes
                  </ActionBtn>

                  <IconActions>
                    <ActionBtn
                      variant="edit"
                      onClick={() => handleOpenEdit(book)}
                      title="Editar livro"
                    >
                      <Edit3 size={16} />
                    </ActionBtn>

                    <ActionBtn
                      variant="delete"
                      onClick={() => handleDeleteBook(book)}
                      title="Excluir livro"
                    >
                      <Trash2 size={16} />
                    </ActionBtn>
                  </IconActions>
                </CardActions>
              </BookCard>
            ))}
          </Grid>
        )}

        <BookFormModal
          key={isFormOpen ? (bookToEdit ? `edit-${bookToEdit.id}` : 'create-new') : 'closed'}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveBook}
          bookToEdit={bookToEdit}
          existingIds={books.map((b) => b.id)}
        />

        <BookDetailsModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      </Container>
    </>
  );
}

export default App;

const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 2rem;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  h1 {
    font-size: 1.75rem;
    color: #3b2818;
  }

  p {
    color: #786452;
    font-size: 0.95rem;
  }
`;

const IconCircle = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: linear-gradient(135deg, #7c4d25 0%, #a87538 100%);
  color: #fffdf9;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(124, 77, 37, 0.22);
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #5e3a73 0%, #7d5296 100%);
  color: #ffffff;
  border: none;
  padding: 0.8rem 1.35rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 6px 18px rgba(94, 58, 115, 0.24);
  transition: transform 0.15s ease, filter 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.06);
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: #fffdf9;
  border: 1px solid #dfd1be;
  padding: 0.7rem 1rem;
  border-radius: 12px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 4px 12px rgba(44, 36, 30, 0.04);

  input {
    border: none;
    background: transparent;
    width: 100%;
    font-size: 0.95rem;
    color: #2c241e;

    &:focus {
      outline: none;
    }
  }
`;

const Counter = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: #f3e9d8;
  color: #7c4d25;
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(295px, 1fr));
  gap: 1.35rem;
`;

const BookCard = styled.article`
  background: #fffdf9;
  border: 1px solid #e6d9c6;
  border-radius: 16px;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 8px 24px rgba(59, 40, 24, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 30px rgba(59, 40, 24, 0.11);
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.85rem;
`;

const YearTag = styled.span`
  background: #f4ead8;
  color: #8a5a24;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: 8px;
`;

const IdTag = styled.span`
  font-size: 0.75rem;
  color: #9c8976;
  font-weight: 500;
`;

const BookTitle = styled.h3`
  font-size: 1.18rem;
  color: #2c241e;
  line-height: 1.35;
  margin-bottom: 0.35rem;
`;

const BookAuthor = styled.p`
  font-size: 0.9rem;
  color: #786452;
  margin-bottom: 1.35rem;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.9rem;
  border-top: 1px solid #f0e6d8;
`;

const IconActions = styled.div`
  display: flex;
  gap: 0.45rem;
`;

const ActionBtn = styled.button<{ variant: 'details' | 'edit' | 'delete' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  border-radius: 9px;
  padding: 0.5rem 0.75rem;
  font-size: 0.84rem;
  font-weight: 600;
  transition: background 0.15s ease;

  ${({ variant }) =>
    variant === 'details' &&
    `
    background: #f3ece1;
    color: #5c4938;
    &:hover { background: #e8dccb; }
  `}

  ${({ variant }) =>
    variant === 'edit' &&
    `
    background: #eef2f8;
    color: #365985;
    padding: 0.5rem;
    &:hover { background: #dce5f2; }
  `}

  ${({ variant }) =>
    variant === 'delete' &&
    `
    background: #fbeeed;
    color: #b53834;
    padding: 0.5rem;
    &:hover { background: #f6dcd9; }
  `}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 1.5rem;
  background: #fffdf9;
  border: 1px dashed #d8c6ae;
  border-radius: 18px;

  h3 {
    margin-top: 0.85rem;
    color: #4a3525;
  }

  p {
    color: #857260;
    margin-top: 0.35rem;
    font-size: 0.95rem;
  }
`;