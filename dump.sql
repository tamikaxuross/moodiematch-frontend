--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Homebrew)
-- Dumped by pg_dump version 14.17 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: favorites; Type: TABLE; Schema: public; Owner: tamikaross
--

CREATE TABLE public.favorites (
    id integer NOT NULL,
    user_id integer,
    movie_id integer
);


ALTER TABLE public.favorites OWNER TO tamikaross;

--
-- Name: favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: tamikaross
--

CREATE SEQUENCE public.favorites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorites_id_seq OWNER TO tamikaross;

--
-- Name: favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamikaross
--

ALTER SEQUENCE public.favorites_id_seq OWNED BY public.favorites.id;


--
-- Name: movies; Type: TABLE; Schema: public; Owner: tamikaross
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    title text NOT NULL,
    genre text,
    release_year integer,
    poster_url text
);


ALTER TABLE public.movies OWNER TO tamikaross;

--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: tamikaross
--

CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movies_id_seq OWNER TO tamikaross;

--
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamikaross
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- Name: quiz_answers; Type: TABLE; Schema: public; Owner: tamikaross
--

CREATE TABLE public.quiz_answers (
    id integer NOT NULL,
    quiz_id integer,
    question text,
    answer text
);


ALTER TABLE public.quiz_answers OWNER TO tamikaross;

--
-- Name: quiz_answers_id_seq; Type: SEQUENCE; Schema: public; Owner: tamikaross
--

CREATE SEQUENCE public.quiz_answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quiz_answers_id_seq OWNER TO tamikaross;

--
-- Name: quiz_answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamikaross
--

ALTER SEQUENCE public.quiz_answers_id_seq OWNED BY public.quiz_answers.id;


--
-- Name: quizzes; Type: TABLE; Schema: public; Owner: tamikaross
--

CREATE TABLE public.quizzes (
    id integer NOT NULL,
    user_id integer,
    quiz_date date DEFAULT CURRENT_DATE,
    result_movie_id integer
);


ALTER TABLE public.quizzes OWNER TO tamikaross;

--
-- Name: quizzes_id_seq; Type: SEQUENCE; Schema: public; Owner: tamikaross
--

CREATE SEQUENCE public.quizzes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quizzes_id_seq OWNER TO tamikaross;

--
-- Name: quizzes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamikaross
--

ALTER SEQUENCE public.quizzes_id_seq OWNED BY public.quizzes.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tamikaross
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL
);


ALTER TABLE public.users OWNER TO tamikaross;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tamikaross
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO tamikaross;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamikaross
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: favorites id; Type: DEFAULT; Schema: public; Owner: tamikaross
--

ALTER TABLE ONLY public.favorites ALTER COLUMN id SET DEFAULT nextval('public.favorites_id_seq'::regclass);


--
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: tamikaross
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- Name: quiz_answers id; Type: DEFAULT; Schema: public; Owner: tamikaross
--

ALTER TABLE ONLY public.quiz_answers ALTER COLUMN id SET DEFAULT nextval('public.quiz_answers_id_seq'::regclass);


--
-- Name: quizzes id; Type: DEFAULT; Schema: public; Owner: tamikaross
--

ALTER TABLE ONLY public.quizzes ALTER COLUMN id SET DEFAULT nextval('public.quizzes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tamikaross
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: tamikaross
--

COPY public.favorites (id, user_id, movie_id) FROM stdin;
\.


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: tamikaross
--

COPY public.movies (id, title, genre, release_year, poster_url) FROM stdin;
1	Hidden Figures	Drama	\N	\N
2	Black Panther	Action	2018	\N
3	The Pursuit of Happyness	Drama	2006	\N
4	Hidden Figures	Drama	2016	\N
5	Spider-Man: Into the Spider-Verse	Animation	2018	\N
6	Everything Everywhere All At Once	Sci-Fi	2022	\N
7	Queen & Slim	Romance	2019	\N
8	Moonlight	Drama	2016	\N
9	Creed	Sports	2015	\N
10	Bridesmaids	funny	2011	\N
11	Superbad	funny	2007	\N
12	The Hangover	funny	2009	\N
13	Napoleon Dynamite	funny	2004	\N
14	The Notebook	emotional	2004	\N
15	Marley & Me	sad	2008	\N
16	A Walk to Remember	emotional	2002	\N
17	Manchester by the Sea	sad	2016	\N
18	Hidden Figures	empowering	2016	\N
19	The Pursuit of Happyness	uplifting	2006	\N
20	Erin Brockovich	empowering	2000	\N
21	Bend It Like Beckham	uplifting	2002	\N
22	Soul	animated	2020	\N
23	Inside Out	animated	2015	\N
24	Coco	animated	2017	\N
25	Up	animated	2009	\N
26	Get Out	thriller	2017	\N
27	Inception	mind-bending	2010	\N
28	Everything Everywhere All At Once	mind-bending	2022	\N
29	The Truman Show	thought-provoking	1998	\N
\.


--
-- Data for Name: quiz_answers; Type: TABLE DATA; Schema: public; Owner: tamikaross
--

COPY public.quiz_answers (id, quiz_id, question, answer) FROM stdin;
1	1	Favorite genre?	Drama
2	1	Inspirational or Action?	Inspirational
3	2	Favorite genre?	Drama
4	2	Inspirational or Action?	Inspirational
5	3	Favorite genre?	Drama
6	3	Inspirational or Action?	Inspirational
7	4	Favorite genre?	Drama
8	4	Inspirational or Action?	Inspirational
9	5	Favorite genre?	Drama
10	5	Inspirational or Action?	Inspirational
11	\N	Favorite genre?	Drama
12	\N	Inspirational or Action?	Inspirational
13	\N	Favorite genre?	Drama
14	\N	Inspirational or Action?	Inspirational
15	\N	Do you like emotional movies?	Yes
16	\N	Do you prefer classics or modern?	Modern
17	\N	What's your vibe today?	Cozy
18	\N	Do you prefer reality or fantasy?	Fantasy
19	\N	\N	\N
20	\N	\N	\N
21	\N	\N	\N
22	\N	\N	\N
23	\N	\N	\N
24	\N	\N	\N
25	\N	\N	\N
26	\N	\N	\N
27	\N	\N	\N
28	\N	\N	\N
29	\N	\N	\N
30	\N	\N	\N
31	\N	\N	\N
32	\N	\N	\N
33	\N	\N	\N
34	23	\N	\N
35	23	\N	\N
36	23	\N	\N
37	24	\N	\N
38	24	\N	\N
39	24	\N	\N
40	25	\N	\N
41	25	\N	\N
42	25	\N	\N
43	26	\N	\N
44	26	\N	\N
45	26	\N	\N
46	27	\N	\N
47	27	\N	\N
48	27	\N	\N
49	28	\N	\N
50	28	\N	\N
51	28	\N	\N
52	29	\N	\N
53	29	\N	\N
54	29	\N	\N
55	30	\N	\N
56	30	\N	\N
57	30	\N	\N
58	31	\N	\N
59	31	\N	\N
60	31	\N	\N
61	32	\N	\N
62	32	\N	\N
63	32	\N	\N
64	33	\N	\N
65	33	\N	\N
66	33	\N	\N
67	34	\N	\N
68	34	\N	\N
69	34	\N	\N
70	35	\N	\N
71	35	\N	\N
72	35	\N	\N
73	36	\N	\N
74	36	\N	\N
75	36	\N	\N
76	37	\N	\N
77	37	\N	\N
78	37	\N	\N
79	38	\N	\N
80	38	\N	\N
81	38	\N	\N
82	39	\N	\N
83	39	\N	\N
84	39	\N	\N
\.


--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: tamikaross
--

COPY public.quizzes (id, user_id, quiz_date, result_movie_id) FROM stdin;
1	1	2025-07-22	\N
2	1	2025-07-22	\N
3	1	2025-07-22	\N
4	1	2025-07-22	\N
5	1	2025-07-22	\N
6	1	2025-07-22	\N
7	1	2025-07-22	\N
8	1	2025-07-22	\N
9	1	2025-07-22	\N
10	1	2025-07-22	\N
11	1	2025-07-22	\N
12	1	2025-07-22	\N
13	1	2025-07-22	\N
14	1	2025-07-22	\N
15	1	2025-07-22	\N
16	1	2025-07-22	\N
17	1	2025-07-22	\N
18	1	2025-07-24	\N
19	1	2025-07-24	\N
20	1	2025-07-24	\N
21	1	2025-07-24	\N
22	1	2025-07-24	\N
23	1	2025-07-24	29
24	1	2025-07-24	20
25	1	2025-07-24	15
26	1	2025-07-24	16
27	1	2025-07-24	3
28	1	2025-07-24	13
29	1	2025-07-24	4
30	1	2025-07-24	24
31	1	2025-07-24	22
32	1	2025-07-24	12
33	1	2025-07-24	23
34	1	2025-07-24	7
35	1	2025-07-24	20
36	1	2025-07-24	24
37	1	2025-07-24	26
38	1	2025-07-24	18
39	1	2025-07-24	26
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tamikaross
--

COPY public.users (id, username) FROM stdin;
1	me_ro
2	testuser
\.


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamikaross
--

SELECT pg_catalog.setval('public.favorites_id_seq', 1, false);


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamikaross
--

SELECT pg_catalog.setval('public.movies_id_seq', 29, true);


--
-- Name: quiz_answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamikaross
--

SELECT pg_catalog.setval('public.quiz_answers_id_seq', 84, true);


--
-- Name: quizzes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamikaross
--

SELECT pg_catalog.setval('public.quizzes_id_seq', 39, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamikaross
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: tamikaross
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: tamikaross
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: quiz_answers quiz_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: tamikaross
--

ALTER TABLE ONLY public.quiz_answers
    ADD CONSTRAINT quiz_answers_pkey PRIMARY KEY (id);


--
-- Name: quizzes quizzes_pkey; Type: CONSTRAINT; Schema: public; Owner: tamikaross
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tamikaross
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamikaross
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movies(id);


--
-- Name: favorites favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamikaross
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: quiz_answers quiz_answers_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamikaross
--

ALTER TABLE ONLY public.quiz_answers
    ADD CONSTRAINT quiz_answers_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id);


--
-- Name: quizzes quizzes_result_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamikaross
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_result_movie_id_fkey FOREIGN KEY (result_movie_id) REFERENCES public.movies(id);


--
-- Name: quizzes quizzes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamikaross
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

