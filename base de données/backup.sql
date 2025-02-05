--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: update_modification_dates(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_modification_dates() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF (TG_OP = 'UPDATE') THEN
        IF NEW.etude IS DISTINCT FROM OLD.etude THEN
            NEW.etude_date = CURRENT_TIMESTAMP;
        END IF;
        
        IF NEW.dispatch_task IS DISTINCT FROM OLD.dispatch_task THEN
            NEW.dispatch_task_date = CURRENT_TIMESTAMP;
        END IF;
        
        IF NEW.pre_visa IS DISTINCT FROM OLD.pre_visa THEN
            NEW.pre_visa_date = CURRENT_TIMESTAMP;
        END IF;
        
        IF NEW.saisie IS DISTINCT FROM OLD.saisie THEN
            NEW.saisie_date = CURRENT_TIMESTAMP;
        END IF;
        
        IF NEW.verification IS DISTINCT FROM OLD.verification THEN
            NEW.verification_date = CURRENT_TIMESTAMP;
        END IF;
        
        IF NEW.depart IS DISTINCT FROM OLD.depart THEN
            NEW.depart_date = CURRENT_TIMESTAMP;
        END IF;
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_modification_dates() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documents (
    id integer NOT NULL,
    nom character varying(255) NOT NULL,
    numero character varying(50) NOT NULL,
    date_arrivee date NOT NULL,
    affn character varying(100),
    index_dossier character varying(100),
    arr character varying(100),
    details text,
    autre text,
    etude boolean DEFAULT false,
    dispatch_task boolean DEFAULT false,
    pre_visa boolean DEFAULT false,
    saisie boolean DEFAULT false,
    verification boolean DEFAULT false,
    depart boolean,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    etude_date timestamp without time zone,
    dispatch_task_date timestamp without time zone,
    pre_visa_date timestamp without time zone,
    saisie_date timestamp without time zone,
    verification_date timestamp without time zone,
    depart_date timestamp without time zone
);


ALTER TABLE public.documents OWNER TO postgres;

--
-- Name: documents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.documents_id_seq OWNER TO postgres;

--
-- Name: documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.documents_id_seq OWNED BY public.documents.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    role boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: documents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents ALTER COLUMN id SET DEFAULT nextval('public.documents_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.documents (id, nom, numero, date_arrivee, affn, index_dossier, arr, details, autre, etude, dispatch_task, pre_visa, saisie, verification, depart, created_at, updated_at, etude_date, dispatch_task_date, pre_visa_date, saisie_date, verification_date, depart_date) FROM stdin;
33	test	45	2024-12-21	XWX	C	CX	CXCX	CXCFKDSGHGFGi	t	t	t	t	t	t	2025-01-31 07:47:20.247063	2025-02-03 05:32:03.140231	2025-02-01 14:33:01.642	2025-02-01 18:34:34.482	2025-02-01 22:34:50.192	2025-02-01 14:33:01.642	2025-02-03 05:32:03.140231	2025-02-03 05:32:03.140231
34	Dossier 1	3	2025-01-31	DF	D	DS	DSFFDSG	GDFGF	t	f	f	f	f	f	2025-02-02 08:36:10.218582	2025-02-03 06:07:31.351825	2025-02-03 06:07:31.351825	\N	\N	\N	\N	\N
35	test	33	2025-02-01	DSQSS	SD	SD	Cette alerte ESLint indique une concaténation inutile de chaînes de caractères (strings) littérales. Le message "no-useless-concat" signifie que vous avez probablement écrit quelque chose comme :	Cette alerte ESLint indique une concaténation inutile de chaînes de caractères (strings) littérales. Le message "no-useless-concat" signifie que vous avez probablement écrit quelque chose comme :	t	t	f	f	f	f	2025-02-03 06:08:21.075125	2025-02-03 06:08:21.075125	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, created_at, role) FROM stdin;
11	tolotra	admin@gmail.com	$2b$10$/ZkWjxTi0e31y8viYX24lupZHFbXb8LyXETV0yp.4lBJWUNCLmucO	2025-02-01 20:40:52.638638+02	t
10	test	test@gmail.com	$2b$10$zVaq7mV3iTH72v/aqRNgqeXCj7CorOok7qhnIg1IE2mYm66Cukn.G	2025-01-31 07:17:14.898267+02	f
\.


--
-- Name: documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.documents_id_seq', 35, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: documents modification_dates_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER modification_dates_trigger BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION public.update_modification_dates();


--
-- PostgreSQL database dump complete
--

