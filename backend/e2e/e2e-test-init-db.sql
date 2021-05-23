--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

-- Started on 2021-05-23 18:29:08

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

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 2830 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 148722)
-- Name: user; Type: TABLE; Schema: public; Owner: prime-factorization
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    guid character varying NOT NULL,
    email character varying NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    "profileImageUrl" character varying,
    password character varying,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone
);


ALTER TABLE public."user" OWNER TO "prime-factorization";

--
-- TOC entry 202 (class 1259 OID 148720)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: prime-factorization
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO "prime-factorization";

--
-- TOC entry 2831 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: prime-factorization
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 2688 (class 2604 OID 148725)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: prime-factorization
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 2824 (class 0 OID 148722)
-- Dependencies: 203
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: prime-factorization
--

COPY public."user" (id, guid, email, "firstName", "lastName", "profileImageUrl", password, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	1a43d3d9-9bde-441d-ac60-372e34789c2c	john.doe@gmail.com	John	Doe	\N	$2b$10$rhcCJkA75CaAbdn/70QMTudz3XmfGF9./E9lI4WO3XUsOHFKLIljC	2021-05-23 11:17:39.816	2021-05-23 11:17:39.816	\N
\.


--
-- TOC entry 2832 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: prime-factorization
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- TOC entry 2692 (class 2606 OID 148732)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: prime-factorization
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 2694 (class 2606 OID 148734)
-- Name: user UQ_61ea3ae73af64f7ce8e9fe55e10; Type: CONSTRAINT; Schema: public; Owner: prime-factorization
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_61ea3ae73af64f7ce8e9fe55e10" UNIQUE (guid);


--
-- TOC entry 2696 (class 2606 OID 148736)
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: prime-factorization
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


-- Completed on 2021-05-23 18:29:10

--
-- PostgreSQL database dump complete
--

