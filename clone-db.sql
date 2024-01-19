PGDMP     3    #                 |            letgo_clone    15.5    15.3 O    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24609    letgo_clone    DATABASE     �   CREATE DATABASE letgo_clone WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';
    DROP DATABASE letgo_clone;
                postgres    false            �            1259    24802    advert_favorites    TABLE     t   CREATE TABLE public.advert_favorites (
    favorite_id bigint NOT NULL,
    user_id bigint,
    advert_id bigint
);
 $   DROP TABLE public.advert_favorites;
       public         heap    postgres    false            �            1259    24801     advert_favorites_favorite_id_seq    SEQUENCE     �   ALTER TABLE public.advert_favorites ALTER COLUMN favorite_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.advert_favorites_favorite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    225            �            1259    24849    advert_images    TABLE     �   CREATE TABLE public.advert_images (
    images_id bigint NOT NULL,
    advert_id bigint NOT NULL,
    is_cover_image boolean DEFAULT false NOT NULL,
    url text NOT NULL,
    path text NOT NULL,
    width bigint NOT NULL,
    height bigint NOT NULL
);
 !   DROP TABLE public.advert_images;
       public         heap    postgres    false            �            1259    24848    advert_images_images_id_seq    SEQUENCE     �   ALTER TABLE public.advert_images ALTER COLUMN images_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.advert_images_images_id_seq
    START WITH 123000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    227            �            1259    24701    advert_status    TABLE     �   CREATE TABLE public.advert_status (
    id bigint NOT NULL,
    display_type text NOT NULL,
    display_name text NOT NULL,
    is_visible boolean DEFAULT true NOT NULL
);
 !   DROP TABLE public.advert_status;
       public         heap    postgres    false            �            1259    24700    advert_status_id_seq    SEQUENCE     �   ALTER TABLE public.advert_status ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.advert_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    24681    adverts    TABLE     �  CREATE TABLE public.adverts (
    id bigint NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    is_visible boolean DEFAULT true NOT NULL,
    is_deleted boolean DEFAULT false,
    user_id bigint,
    price bigint,
    status_id bigint DEFAULT 2,
    city_id bigint,
    county_id bigint,
    how_status text,
    main_category_id bigint NOT NULL,
    sub_category_id bigint,
    is_sell boolean DEFAULT false NOT NULL
);
    DROP TABLE public.adverts;
       public         heap    postgres    false            �            1259    24680    adverts_id_seq    SEQUENCE     �   ALTER TABLE public.adverts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.adverts_id_seq
    START WITH 1200305859
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    24756    cities    TABLE     �   CREATE TABLE public.cities (
    id integer NOT NULL,
    plateno character(2) NOT NULL,
    city character varying(50) NOT NULL
);
    DROP TABLE public.cities;
       public         heap    postgres    false            �            1259    24755    cities_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.cities_id_seq;
       public          postgres    false    221            �           0    0    cities_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.id;
          public          postgres    false    220            �            1259    24767    counties    TABLE     �   CREATE TABLE public.counties (
    id integer NOT NULL,
    city_id integer NOT NULL,
    county character varying(50) NOT NULL
);
    DROP TABLE public.counties;
       public         heap    postgres    false            �            1259    24766    counties_id_seq    SEQUENCE     �   CREATE SEQUENCE public.counties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.counties_id_seq;
       public          postgres    false    223            �           0    0    counties_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.counties_id_seq OWNED BY public.counties.id;
          public          postgres    false    222            �            1259    32793    main_categories    TABLE     �   CREATE TABLE public.main_categories (
    category_id bigint NOT NULL,
    category_name text NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    icon text NOT NULL
);
 #   DROP TABLE public.main_categories;
       public         heap    postgres    false            �            1259    32792    main_categories_category_id_seq    SEQUENCE     �   ALTER TABLE public.main_categories ALTER COLUMN category_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.main_categories_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    229            �            1259    32804    sub_categories    TABLE     �   CREATE TABLE public.sub_categories (
    sub_category_id bigint NOT NULL,
    main_category_id bigint NOT NULL,
    sub_category_name text NOT NULL,
    is_visible boolean DEFAULT true NOT NULL
);
 "   DROP TABLE public.sub_categories;
       public         heap    postgres    false            �            1259    32803 "   sub_categories_sub_category_id_seq    SEQUENCE     �   ALTER TABLE public.sub_categories ALTER COLUMN sub_category_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sub_categories_sub_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    231            �            1259    24610    users    TABLE     k  CREATE TABLE public.users (
    id integer NOT NULL,
    fullname text NOT NULL,
    email text NOT NULL,
    about text,
    is_verify boolean DEFAULT true NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    phone_number bigint,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    password text,
    photo json,
    user_type text
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24624    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1467
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �           2604    24759 	   cities id    DEFAULT     f   ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public.cities_id_seq'::regclass);
 8   ALTER TABLE public.cities ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    24770    counties id    DEFAULT     j   ALTER TABLE ONLY public.counties ALTER COLUMN id SET DEFAULT nextval('public.counties_id_seq'::regclass);
 :   ALTER TABLE public.counties ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            �          0    24802    advert_favorites 
   TABLE DATA           K   COPY public.advert_favorites (favorite_id, user_id, advert_id) FROM stdin;
    public          postgres    false    225   c`       �          0    24849    advert_images 
   TABLE DATA           g   COPY public.advert_images (images_id, advert_id, is_cover_image, url, path, width, height) FROM stdin;
    public          postgres    false    227   �`       }          0    24701    advert_status 
   TABLE DATA           S   COPY public.advert_status (id, display_type, display_name, is_visible) FROM stdin;
    public          postgres    false    219   �       {          0    24681    adverts 
   TABLE DATA           �   COPY public.adverts (id, title, description, created_at, is_visible, is_deleted, user_id, price, status_id, city_id, county_id, how_status, main_category_id, sub_category_id, is_sell) FROM stdin;
    public          postgres    false    217   J�                 0    24756    cities 
   TABLE DATA           3   COPY public.cities (id, plateno, city) FROM stdin;
    public          postgres    false    221   ��       �          0    24767    counties 
   TABLE DATA           7   COPY public.counties (id, city_id, county) FROM stdin;
    public          postgres    false    223   T�       �          0    32793    main_categories 
   TABLE DATA           W   COPY public.main_categories (category_id, category_name, is_visible, icon) FROM stdin;
    public          postgres    false    229   P�       �          0    32804    sub_categories 
   TABLE DATA           j   COPY public.sub_categories (sub_category_id, main_category_id, sub_category_name, is_visible) FROM stdin;
    public          postgres    false    231   S�       x          0    24610    users 
   TABLE DATA           �   COPY public.users (id, fullname, email, about, is_verify, is_deleted, phone_number, created_at, password, photo, user_type) FROM stdin;
    public          postgres    false    214   B�       �           0    0     advert_favorites_favorite_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.advert_favorites_favorite_id_seq', 78, true);
          public          postgres    false    224            �           0    0    advert_images_images_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.advert_images_images_id_seq', 123126, true);
          public          postgres    false    226            �           0    0    advert_status_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.advert_status_id_seq', 5, true);
          public          postgres    false    218            �           0    0    adverts_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.adverts_id_seq', 1200305945, true);
          public          postgres    false    216            �           0    0    cities_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.cities_id_seq', 1, false);
          public          postgres    false    220            �           0    0    counties_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.counties_id_seq', 1, false);
          public          postgres    false    222            �           0    0    main_categories_category_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.main_categories_category_id_seq', 10, true);
          public          postgres    false    228            �           0    0 "   sub_categories_sub_category_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.sub_categories_sub_category_id_seq', 64, true);
          public          postgres    false    230            �           0    0    users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.users_id_seq', 1480, true);
          public          postgres    false    215            �           2606    24806 &   advert_favorites advert_favorites_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.advert_favorites
    ADD CONSTRAINT advert_favorites_pkey PRIMARY KEY (favorite_id);
 P   ALTER TABLE ONLY public.advert_favorites DROP CONSTRAINT advert_favorites_pkey;
       public            postgres    false    225            �           2606    24855     advert_images advert_images_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.advert_images
    ADD CONSTRAINT advert_images_pkey PRIMARY KEY (images_id);
 J   ALTER TABLE ONLY public.advert_images DROP CONSTRAINT advert_images_pkey;
       public            postgres    false    227            �           2606    24708     advert_status advert_status_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.advert_status
    ADD CONSTRAINT advert_status_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.advert_status DROP CONSTRAINT advert_status_pkey;
       public            postgres    false    219            �           2606    24826    adverts adverts_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.adverts
    ADD CONSTRAINT adverts_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.adverts DROP CONSTRAINT adverts_pkey;
       public            postgres    false    217            �           2606    24765    cities cities_city_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_city_key UNIQUE (city);
 @   ALTER TABLE ONLY public.cities DROP CONSTRAINT cities_city_key;
       public            postgres    false    221            �           2606    24761    cities cities_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.cities DROP CONSTRAINT cities_pkey;
       public            postgres    false    221            �           2606    24763    cities cities_plateno_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_plateno_key UNIQUE (plateno);
 C   ALTER TABLE ONLY public.cities DROP CONSTRAINT cities_plateno_key;
       public            postgres    false    221            �           2606    24774 $   counties counties_city_id_county_key 
   CONSTRAINT     j   ALTER TABLE ONLY public.counties
    ADD CONSTRAINT counties_city_id_county_key UNIQUE (city_id, county);
 N   ALTER TABLE ONLY public.counties DROP CONSTRAINT counties_city_id_county_key;
       public            postgres    false    223    223            �           2606    24772    counties counties_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.counties
    ADD CONSTRAINT counties_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.counties DROP CONSTRAINT counties_pkey;
       public            postgres    false    223            �           2606    32813 $   main_categories main_categories_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.main_categories
    ADD CONSTRAINT main_categories_pkey PRIMARY KEY (category_id);
 N   ALTER TABLE ONLY public.main_categories DROP CONSTRAINT main_categories_pkey;
       public            postgres    false    229            �           2606    32811 "   sub_categories sub_categories_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.sub_categories
    ADD CONSTRAINT sub_categories_pkey PRIMARY KEY (sub_category_id);
 L   ALTER TABLE ONLY public.sub_categories DROP CONSTRAINT sub_categories_pkey;
       public            postgres    false    231            �           2606    24619    users user_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT user_pkey;
       public            postgres    false    214            �           1259    24812    fki_a    INDEX     E   CREATE INDEX fki_a ON public.advert_favorites USING btree (user_id);
    DROP INDEX public.fki_a;
       public            postgres    false    225            �           1259    24824    fki_advert_favorites    INDEX     X   CREATE INDEX fki_advert_favorites ON public.advert_favorites USING btree (favorite_id);
 (   DROP INDEX public.fki_advert_favorites;
       public            postgres    false    225            �           1259    24785    fki_city_advert    INDEX     F   CREATE INDEX fki_city_advert ON public.adverts USING btree (city_id);
 #   DROP INDEX public.fki_city_advert;
       public            postgres    false    217            �           1259    24791    fki_counties_advert    INDEX     L   CREATE INDEX fki_counties_advert ON public.adverts USING btree (county_id);
 '   DROP INDEX public.fki_counties_advert;
       public            postgres    false    217            �           1259    24832    fki_favorite_advert    INDEX     U   CREATE INDEX fki_favorite_advert ON public.advert_favorites USING btree (advert_id);
 '   DROP INDEX public.fki_favorite_advert;
       public            postgres    false    225            �           1259    24818    fki_favorite_user    INDEX     Q   CREATE INDEX fki_favorite_user ON public.advert_favorites USING btree (user_id);
 %   DROP INDEX public.fki_favorite_user;
       public            postgres    false    225            �           1259    32785    fki_image_advert    INDEX     O   CREATE INDEX fki_image_advert ON public.advert_images USING btree (advert_id);
 $   DROP INDEX public.fki_image_advert;
       public            postgres    false    227            �           1259    32837    fki_main_category_advert    INDEX     X   CREATE INDEX fki_main_category_advert ON public.adverts USING btree (main_category_id);
 ,   DROP INDEX public.fki_main_category_advert;
       public            postgres    false    217            �           1259    32819    fki_s    INDEX     L   CREATE INDEX fki_s ON public.sub_categories USING btree (main_category_id);
    DROP INDEX public.fki_s;
       public            postgres    false    231            �           1259    24714    fki_status_adverts    INDEX     K   CREATE INDEX fki_status_adverts ON public.adverts USING btree (status_id);
 &   DROP INDEX public.fki_status_adverts;
       public            postgres    false    217            �           1259    32843    fki_sub_category_advert    INDEX     V   CREATE INDEX fki_sub_category_advert ON public.adverts USING btree (sub_category_id);
 +   DROP INDEX public.fki_sub_category_advert;
       public            postgres    false    217            �           1259    24697    fki_users_advert    INDEX     G   CREATE INDEX fki_users_advert ON public.adverts USING btree (user_id);
 $   DROP INDEX public.fki_users_advert;
       public            postgres    false    217            �           2606    24780    adverts city_advert    FK CONSTRAINT     �   ALTER TABLE ONLY public.adverts
    ADD CONSTRAINT city_advert FOREIGN KEY (city_id) REFERENCES public.cities(id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;
 =   ALTER TABLE ONLY public.adverts DROP CONSTRAINT city_advert;
       public          postgres    false    221    217    3530            �           2606    24786    adverts counties_advert    FK CONSTRAINT     �   ALTER TABLE ONLY public.adverts
    ADD CONSTRAINT counties_advert FOREIGN KEY (county_id) REFERENCES public.counties(id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;
 A   ALTER TABLE ONLY public.adverts DROP CONSTRAINT counties_advert;
       public          postgres    false    217    223    3536            �           2606    24775    counties counties_city_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.counties
    ADD CONSTRAINT counties_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.cities(id);
 H   ALTER TABLE ONLY public.counties DROP CONSTRAINT counties_city_id_fkey;
       public          postgres    false    223    221    3530            �           2606    24843     advert_favorites favorite_advert    FK CONSTRAINT     �   ALTER TABLE ONLY public.advert_favorites
    ADD CONSTRAINT favorite_advert FOREIGN KEY (advert_id) REFERENCES public.adverts(id) ON UPDATE SET NULL ON DELETE SET NULL NOT VALID;
 J   ALTER TABLE ONLY public.advert_favorites DROP CONSTRAINT favorite_advert;
       public          postgres    false    217    225    3518            �           2606    24838    advert_favorites favorite_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.advert_favorites
    ADD CONSTRAINT favorite_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE SET NULL ON DELETE SET NULL NOT VALID;
 H   ALTER TABLE ONLY public.advert_favorites DROP CONSTRAINT favorite_user;
       public          postgres    false    3516    214    225            �           2606    32780    advert_images image_advert    FK CONSTRAINT     �   ALTER TABLE ONLY public.advert_images
    ADD CONSTRAINT image_advert FOREIGN KEY (advert_id) REFERENCES public.adverts(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 D   ALTER TABLE ONLY public.advert_images DROP CONSTRAINT image_advert;
       public          postgres    false    3518    217    227            �           2606    32814 &   sub_categories main_and_sub_categories    FK CONSTRAINT     �   ALTER TABLE ONLY public.sub_categories
    ADD CONSTRAINT main_and_sub_categories FOREIGN KEY (main_category_id) REFERENCES public.main_categories(category_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 P   ALTER TABLE ONLY public.sub_categories DROP CONSTRAINT main_and_sub_categories;
       public          postgres    false    229    3547    231            �           2606    32832    adverts main_category_advert    FK CONSTRAINT     �   ALTER TABLE ONLY public.adverts
    ADD CONSTRAINT main_category_advert FOREIGN KEY (main_category_id) REFERENCES public.main_categories(category_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 F   ALTER TABLE ONLY public.adverts DROP CONSTRAINT main_category_advert;
       public          postgres    false    217    3547    229            �           2606    24709    adverts status_adverts    FK CONSTRAINT     �   ALTER TABLE ONLY public.adverts
    ADD CONSTRAINT status_adverts FOREIGN KEY (status_id) REFERENCES public.advert_status(id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;
 @   ALTER TABLE ONLY public.adverts DROP CONSTRAINT status_adverts;
       public          postgres    false    219    3526    217            �           2606    32838    adverts sub_category_advert    FK CONSTRAINT     �   ALTER TABLE ONLY public.adverts
    ADD CONSTRAINT sub_category_advert FOREIGN KEY (sub_category_id) REFERENCES public.sub_categories(sub_category_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 E   ALTER TABLE ONLY public.adverts DROP CONSTRAINT sub_category_advert;
       public          postgres    false    231    3550    217            �           2606    24692    adverts users_advert    FK CONSTRAINT     �   ALTER TABLE ONLY public.adverts
    ADD CONSTRAINT users_advert FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE SET NULL ON DELETE SET NULL NOT VALID;
 >   ALTER TABLE ONLY public.adverts DROP CONSTRAINT users_advert;
       public          postgres    false    3516    214    217            �   y   x�U��1C��a*'Kt�����Ju��a^�W?7�;ʕ��ʉ�ʆ*a���}�����'h�7�_&x�MP�2��o��l�\��s�VT�^������'c�ҟL�����:�      �      x���ٮ�H�%�����V�����I� ��9��U������v#3�fd��nw�n����'��Is�mk���FP��B!�Ơ_�_�m����\�qI��_�q�^E25�dc��W�U�?g�q(���,��d��iܾ���?oY��}Z,��fI��y��{(�?`P�'��ۑI~˶��k��͖���/��/�&!&1�q��_�o�`��XW%��ω�4Y�N�ּ���H��s��_���R��r4Y�dٸ����k��e�W� Q�����TC��K�f��!�s��,��\x�u��H�P·�յ�<ﾙ%���+����-x[�J�c)�M�
�3ܮ�b�t1�&ݑt�lo�.�;�1�^�3���(ͻE�Y�*�? �>8f'�W�����z�Mn7L�)�V�74񚝅t�T�Ŷ�������2^&3x��9צƟ��j���:��l��h�L��TT�^yq�{GYrqVv�[��?�Ľ�m�t��o��6�Ғ��7e�\DU����e@�|d\�V�|S��>���SO��d'�3�(������
�_��~�1�'A!
���� ���k��R��$B�;d��x��:��p��rOeC�ύ����̈��"VT�"+M��ҧ|u��j��L��ix��aXT����I�6o���8W�������)�wϲ����ʮp֢���V��08m�Db�1F��>'� ��ӽu�{R>�y��	F�<M?<�xyM��d.5����^�	������U��[Oo�i>L9����x��&6>����^��Dj��Dt2"mpE8�Tm+׎q'1O^Ⱆu���ώ�d�!_KV�I�ZЃab�zv:�̓�ΟD����B�/$A}�:��Q�򫰎BTt��@���'�0EP
����xN ?\����(N���疍5Z�i�j�~`*b7��xef]�8N/�������7/�2M̦���6�JH!��� ���G	�K�v���Op��0��i#/wM��AS�,��T�&�̠̾����K@��DW���R-���xX?ﶧ������&�A�,�,���l,G�������������ixJ�0�Cѯ&~�gdb����X��u�p%x��ۆP���i 9��`y�0�Y�]�E�|!jy��@�Ӹ�}����h�1Qb��>B�#��B�����H���_��wA�/;�GT��1S$��8� �x����^³���s+�H=�HZL�Lқ�>#Zغ���V
����0
��0��tx0#v����z���*a0þ�w��R$����]���8���D�D�+of)��}>'y�}NF4�:��;?K� ���8���Xo]��B�
�(�5����6U��K�B���3dś����X�AoX��Y|��d��a�ޠ�ʫo�0r]G�����[���f��\R`Ӂ��HN���;�Q�ZB ��`�$�}j���#
p$g3$I�� �!`>���A~��0D��^ȯ9B�yJ�$Y�5y��C��y�+�� "Q�����"�ԧ�1��ع��V��BQ�U����>7D��y���`7J�<!���n����ҔA�\\�~�����, ZmO:�������]�G���@�m6m�9���1f�"^�u��0T
cYǫ��S��9�@/�n���pE�&�y´]�2�}�L���+�v�]w���9\LHt2E�@:kVVv](j�U��Q��5N�V��ЛH�//��*<:�������aE��{�!����#Nru|dgs��"�|!G*}(ejt 1�!����r�������C�i`�-�c_�?���z%�g݁�(M|��.��{�AG��H
���`�ٓ�ZL���-��E�l;�2�	"��N���ͼ?�~�Z��Օ��ի��X*�e�4JngᲕ�j�s>���^Z����a�I��i.�$K�؟L�c�X�>�ŏ��FC���-Vb
��5Z��`�������V���J1C��T�L��Y�Xy��s�A��?/��k�;�u��T�x8��l�e�q&M۾.���𲓥e���ϙ�GD���� ���m�}���BB�yNӂ��<X��#���H�����_ �o��߂�E+㿁��:ъ�e��Q�y�ć�a_ Z��IH��)��3C���6�Z	<�U�@��� �ؙ�[r�z,����>��tD'<f ��Ց�rk�;�KO��h�����/�O7��;��vA�����.�׶�E�-�C �c<����}Q�WL������{2O���4-ċ-<>'�+$��ւ�Z� �"C=ݞa�����y�d�c�(��;D��N���&�����ݎ[�l�X-\�sߴ��|⃦l��;�����'E��}u�+>?��ݡ�g����kv��4�Kw��"♱�4�������!�/�!�?9���iI�>�������p�f+kF��󹁹,�bPK��Q ~�Wi�V�N$DvxƣJ���0���o��KO�Sph&�������"^A6C�����Cg�n�3�I�b�;�5?��ғ��Jlحs����ĢH'Z3{���~.�	�\.�y �MAQ��W#Zv=���Kd��.\^�4�׳p�Ӕ�+�=����p��	R%����,��A��}�ē�����}�ޝ�%6�o����uF� ���L0�����
������2`B"s���f*e:Lp�^��g��wx����',�����T�P#~�
��S���������1�}��2�܋�S�Ū=����SU/��;��x��!������Y0�O�-�m4s=bfLq���K�^�!�y
����>�LE,@�b@>���Z���:���IRu��M���������2�SA�:��=2c_��K�Sl�;_���}>�i`IԈ�WW!�#%˹*�ϻ盐�P]�k�+߬>W�Z@�5���v�AA���������6��9'�Xٖ	��5����5��!�}��:��X��� ���u�`࿣?��7��g�m�%i���F��oa��%z�v��B�S`[�<0�|-��Q��p��}g^09%����^�������Q�0�"t�̜+t�'����s����q��z��ϯ9�܌=���:����OG �~��rK���n�� ��Ü$�6eT�T����DKV}���养�#EaY�>m����xO�G\������k�u��9�$9��K��g)�Z��w���=�>j�l+��RD��橕�c�51i��B$�3�
��C��� ���.�u�D��g�tҺ�����1�~G� �7�����1��:�A��-�P���+s�A��=�":OR�όOQ�Lv����yu3D箸�R>\���j�	1n��f8]�w��aoR��[)"�[�ʦ>�UF��cH{��j��R�)�6z���unolfJ�%�f^TOO�q8��+�u��N�T�Ap���5�ё.U��f̷p�~?���:Z?��V
���lI;9ˁڐA[ݷN������u����h9����U�#A�_�$��%��T��,>���[\UR
�?�h��x�8��}û�������t?���1�~����~ջ�%��0I���~b'!�����헷Sհ�,m��U�_1l�3��h{֦h���Gϑ�E2�W;KL�I�('���2&^�Jz�D]�|�쁺�L([�[���yK+k�	4��Q�~����:���a�f�6E���r���'Gи�ka�L!.>xg��F�֚6��7�+�ݶB��Y?����~]O��)3���gMktu�� nR�X�)N�/���V���" I�����=z0���˪�5�g{�]���@4˵��S��[K[�x����?Z��B�C�o�>J}!ꩿ�_��g	F� �2��Y���D=����xQ«I(�y�F8��6�#�>��巃�*�ȵ�PB��W�%�Y���    �~��9xC�@�E#�fo�C��J�1_`�e���1{�
͑/�g�V�o9�%��K����6�����ܸm���`h�ղPm�l��x�y�]�jc��{@u��C;^����1�+gx�#��ֹ��c��o��~*��"b����%򔌓}��h?"�|����T
�è˯��[W��
��ʬ���ޥz��¾:H���:��9��:�=ֿ�����_�u���GA*o>M�Sg��!��a��g�U&ˎ
�;�kO=#�����+���&���_b��!\CBN��gRܕ���g�pϙEmC��Vf��S��s�+)	���2���f%��/iYK���=�;�Q��%��wS"1�_�)����@'�+!%[�I�hcy!\�j���s|�OUl�e�_S]˕ �m`=kn��$�5`k�1�K��:�o�iU=�Ln-c))��A&W�6���ɻ��W��3���܌-�;�K��A�[g�J%`?k��= 럀��2r�ߌ�/԰�_XA�_*��¿�g�u�W��5B�#�I�N����7:x��w��_%�* 2N2�(>6�o>!<�d��ţ$������y�8���u�R貯q��l�Ϫ �&��l�K��\�a�Nk�u֩f��dg��t!)�7���:R	���s�K5{��u=�9R�x$G�����D�����i���>�Cv��1?���)����#0�"��f���p����\������E��T�6��u@b!�������[+����;X[��P�N�m�=Ꞷ?�&�hvݮ��������c�B�K�\���_R���h�	Aߤ�+�u>�cܠ��Nߎޮ�1�R���rrΎ{CΤ�D��4��5r�;��+��	��d+x��=�{�j�����E]=�ࡾA^@�N5y����)>d �R���������J:���~̞� \1�R�^�.�d"����s�s-Q`:�Ě��+ݑ�~~�#M_��e������5TpX|p��!�h/�{/-ge�{���<��k�l~#��g4a����}=b���>x|���p(�W�$V�΁&��dmm�5|6[��A�C��>S�}����0f�2�3��ϛ���j�N��+�S�OA�)��֣Ty⣳�ܗ�:Mg��ʇ��#���+��) ]U��0m�C�相���k�ڕt?�`�WGI�-n��"��ڡ~!�6S*k���G�)ݛUN��� kW'�-��~�k�N�d�OM~^�����^�`C?��[]�b��<N q�H[2~ibQa��1���*�c٣6	�Dtz=s՜�_�f�>�ǟ�bti�߯�Fa"%�h�q٩b����WUk��A꣱�A�v����h��.��!p���#�!`��w��[�(
!�/@�h��
x�X�4[����Yk���Z"`�+�N�'"��h����������
�ǽ���M�g$� ��$��j���	���*J�$�>�C����xcL'��W�� �KB�����֗&�v���eq�2fD��p�s��ۢyt�/�$F"ғρ�����ݬ���t19;0@���|s[���ͻ5���[�JeK�����=�u+���
��0�70-s�P}�D�z�/�B^���;mBj9;M�
���g$i�5�>99g�r=5(�4���~�|����3��_�fR�N�?%P��>���q����QTi�z{�9!Qz�<o$L�ݶ'��I�n�*�˱�E�U{��HΈ�X�Jo��	�Y�k���z,(q9��{�h���y���X Q+�usчs���D�-x<�9OM�ʔ�������_��WLưb��a�O�~��S죁]��͒�ih_�l)�>W�:{�#��j��cf�*��[z�yt2�X��aU�����؎�ֻ�p#X���[ȭ&�ڋ�e_&��.�+�d��V�j�\���N(��%��y�A�,^�]�~�a�G���r�$�{;�����l�W�J�Zd\�[�[�V�ר�u:/�%P��������4RCl
���0K{ג�0��7e;��.��Ýf�7�:�VP_Qɶ�/���N*�-�MW���� �����Q����kF�^��7�x>ғ"GN�P�[�M���./R��U_� Qq��U�ҚHT-�e����_D1�%n�j�y8��k -����D��-����m[�:&������C����عr�z���oMF_j��b	�o�����]��Nt,����ə7�ΞT�O��7�����P�����?d���� ��w�Ng��~���Y�17�%E�r�(*�z��렋x����(�cAI_t�"�~a��f�(�+�@�2FϪ��UQa��*Tq  �&ɤ�p�nf����;�^�V��ɨ ]I-�ѯ)�	��j�Ԡ=,zmKц�̽࠸�E�>$�c#�w3��k���Q0exD��a(%�Y�[���Q��`�.z�.�H���ONv�wNS�^�:X�N�*6���?�5�{�>�a�R��r���7v[�m�
��������a�ҭD~����0���_��C��(#�P������i�gt�X*��w�t �2pHr
fC$�"�qǮ�	�7WyR!j0�tw��^��0L�܋�'| ����9ũE�+
�P�|N�?�s����׹�A�^���.V�z5CV�j����a��&v��qY�c٫�#�O��g����6S�#v{�+U���RP9K�=IB6 ���ts��	��ME��*�~��X�^oB���܎xaB9�jqbWy-㎶i�3�0	�D���A��}�:v������Y���d������`2>3��:� �������F~E�/0����u"|����$��ͼ^ɟ���A$�~�w؝h�{Q<.~+ܵ�1J��C�-�W�BO��L��9%�"24��ߎ��t�Wg��:���]��s�#Bha�8��x4Zћ��������_t>C��h�)�#�J�KB�4�ΐ:V��flUȕȵᢞA���°]iL߅��?" �m'+���$T��м��\:�*nL-���HW1�N]I#�"Irh 1*S��\"T;�q��p<��z����Ը�{r����X=E�))������k(��N�vN��G>���ҧ��.���t?�����|�����~����u's�?#�M%�%u��h�e@K�x�=ǸUǫ$:�=�O���L��FK�F���P
,�}Xt�\����Zyt�!e!g�w�V}&Я�3���]F3JSr�PHv�.���@85�ho��}3x�}ލ]�o�|�"/��I̐U�٥m=���Q��`+����3�,Ϛ(z����x��r*xF�A۠A��,@��*D84�T�p
ؚ�և�ɷz�:]�qU������hU�
��
[�C���L��84'c��[�|S1�F�$r�����I���/$��=��o�СG�?w��C���[�/FBA�_Q>,��-�
���|o��H�~��z�"H�6ɬ袉_g(�����i-% 8��p�H1��z�2foQ)�SB�!�<nZ���%��j7PQ#]7���B���;%W>�Nq�;fiB�k���_� �8�o�I��} e�0��"���KC՞�^0��]�t��m;5(��Y�D�m��9�h'�-����$�}�L��\Y�N Zv�"P|��`�m:'�l�~�!�;&�r�O�̀��f��.摒Wzb ��py��?�� v�7�J�m�<�s�����f�_a�?����U���!���S,)9��8nG$�e��/D?� <�ނ��ת)	�$-��HG(�X*ZY.�ҿ�Y�҄�BX���aղ��Hţ>(�ݧ�oJ���4����Ef��um�<��9�M���5����-�;EUz�s%���D���B�.��s�����<31�e�i�����U��;Ƅ�ݞ���z�E'C��Xu�Y�r�f��&���ug�b���-Lǻ���u�ÿ�G�d��#D���?W��ΚU�T�{j�D�Bm����d�;n�j7>Y��������C��n    ��������+�>���N>S *���m{@�
�����9���+��H�Pf%���2���e�w�"�����T��=d'�X��//�K�|�=�ϽM�D�q��Ԋs�t���L/(Y��v`�@#�ۇ+�'/�Wfd��3={�=v�@�9fA�:���Τ"��3�z6q��aw	�i��"�e��d��wT*��7}�ڗǬ*��'=��l��:���N��F�"M����K!K;1r9_�(�*C�e9ݕӲ!㞗9�P�:W�Q��L	�^~w�R\�j�R��S��a��Bڮ_�~�KE+�4��������(�{�]��/@=��?�Ηi���D�u[�Z0���}�h2o H~��tC��F�����F�q�.Ĥ��H�j�hڤlo��A�8 �y��Z:6�Ј������A�o�i�@ ?v�%�Z<��a����uF�a�[���%�IF����4A����!�ܑN��˵F�޶�ٚ��d=L�ڟG��9����@������%��Z���XL�rg����m�V։�%�y��t�9��3 �~��>�.��дm�M�eדJa�\x	^�=�G�F%��=��&��Y���:d��|�/�$F��2�$���_��*L��vs�f&�)� �@ͷ��ކ~���1�~��~��1dӈ�
̜)�?3ւ�S�������n��tcWI{�T�WV~K#_6;J,fH�%	L�5��/~�y�b�k{T�$>?�����c6�M�^6��qch+����G���I�SP ��p�R�_-+�7+��@�L�+J�<d�a-��k�\��2�`�������t��>�?���� �?�F`ג���_�F�{hE��<{Q}{QN[G�@��հ!i�����܍E���������J���'�_�f�b@q�;�sށ �ǣܦg=��zB"j8��o��N�і���C�J��u�M�=Ӛ�!fRl�Q�G	j��,�'G,<)�1-6��	�\S/���Z�\EtD�o�%A �R)K��>0T���]%�9��t?��u��pE�&�Y�Fj��e4Ϫ$u����		)<��0���;ޥ~yS�-��:�?���`̮����e�nk%0��_�k��JW[4y�����c��U�%wx�S�n�g��	�4_1:�T��d�Zm��]J�!8��׻&+���iSa��r�V$-��+�����9������0�w'�HU7�A��s�������+�C��T�=|ܾ"�m���c��
�:�)/�w_-��Zo�/U��|�	��J+8�CҔH�B��|C�=��|y��؛%�{�|<3�g�rϑQ��{�Y��T �}}�C&�\��(�{uh�ޖ#�('�m�L������\Əz��W`�OZ�׵�@a�1�5˦{��hA�!�B�i	�����L�=�F��*���V���uwˁ���Q�c��&�q����R:���,|�K�)oJ����+K-T	���k�����G���sQ_���t�WlB;��_�V�߀s��-��Q��h�m|@�$��~[���ϐ�6|5�T7���)��n��AY��[�:(M^ٺ������fs[�CC��/`l������
��v�j��V�!�&�;�>��S��"I��p�<w��Jme'�]g��ͳ<OY~��<°��~�6g��VM�3�)��}�D���
�)%����(}|֑I/cFxw�Ch?d=7d]���'!�H��P��h�3i���e��0^T|���Tx�罉�A����� �W�����M�/*㯛r	���/ 2р����d2�K_1k'�����<�=���޲RTD�Q�#%��P��y��YOi(T���	�	 `c/1�[�ɶ�����z1#��R��nȊ��F럕C^�P�3��z/+~|ˤ�.ī����lq0����n�� ��eJ�#?\5A�$>\�^���Y�Bi����{Q�OJ�N�a�Ī��;vO�,�|�[�-��Y�$e�?QU���{����U�f*��Ȥ��?S���{�U'$0�vPȿͮw�K��(�x����~��qw�ʃ/|�
�;��~�"�Fɯ��C�B�n��d.o�S�-�ll��kSз5�W�b���D�Oo��ĽoJ�W�f���k����&`�{��Y��WƎ8j�������Ё}�zw:{�0\�b�C�O�'DK/*�#Q�%`)�t�9Ld�ËyY�X������m�/�8���򑤈�%��8� frJ7?�U���h����=�
&��q��Kd4�j�N�,8�ԌC��/�m�� �;��+��]Fq2��J����2E|I �<��ٮ
���ݬ@ʎJ�5�1��F1����t~o�Wx��m"�_*�Q�~u� 0'?����>5�	�t����/��w�}���O����`�6�^��v�I8d�-h���B��t]m�
�[��z����	r?�-�����j0���7����?�I�'���|��[0�+|�9nE����u���U����*�8Z�ư6fmA��e�(7�m���:ۂEq}�aV$�1tVVޭM�k+u�co�"͜��bG@�޵�Sr����/�{UU�&��Y���!z��ݎ]<�2V�陌����M��8om0��Qv��am~���d?��i�����OV�������4q��Ѓ��z�J�|؟�]R5�v`�!������(�'�dPK�z�Mb�������M�@`���1��>/�XƓطΨ���f0�
y�꯱ۭNHk%N _&�����{������#��c.>M�^���)ΪHr����޻�����JT�D#�o|"%�{��PaV���g��$���4}ւO�(���yvg�1@�hА饑m)�I���+P�sH��]��Z��{���̚H��؀�3xV�U/`X��
��"���,zǎ���/����
�L}E���¦"���?e�RB��sѰEK�c=�b�(���)+̺h�`���������*,B�b��k]�8#n���Y�8����'�,r�HAռ�̥�'Ly��8C��e�^w�Z��������IAe�����S��Hс]Ly��vs�����wP��p�xV�?�/�����D��~�Q���pi͙:RY�ٻ���gK��/��� �1��	&�&H�}<��֎�:$�/��HQIC���/̡�E��f�Ex�$���2���3����?��+��O��O���� �ߐ�+��i��7ꇏF�zӨ޷>"y|�`p[�'�W����7�(:��5��!}��L�k�`�C��V�f� :��"�̸h������V�JT��$�q̞Oڽ�Y%��/����f���QjC�Ӄ��6��0ّq.�[���u78�9�E�X�/z�#�	.�a��F�-W��Sx� U Zd�y��v���"ז��0hڱ{����n�m�ޔ�K,Y��z�/�"���p�@jZ��c,U��],�B�̍�o�Y�[V�6�_&C�j���=g����觽���w�Ӂ�9�����g�}�� �����$i�F�����q|��+z�Ha~nf)������9+k2L �ې���.-�̰�����R�e��7n���#�pT�Ú�<X����n�G�I.���s�]�d�W��n}�|!m�6Л��-�Xv�'4Ze!�PUN*�C�sy��3�������ȣzW�Y����	�l�/Vk�9mח�I�]�X��S1�ӵ0�(��ZA�i:�N�8Vu�������dK�M�\d]�/L���~�A�����1�C���70�0�di�V��cu`���0�L��/�ާ�6��½�~�,�%۩֑z|Z(����x�s^��O�	!n�\Ȃw1���@F�����}�۠j#r���8�~���#:�'�^ ��S�������ӄˁ�Ahg^�B�$�8UF��;���@�29H�*H�*A��|���j�98��D� ���m(8n���>�N�_�F�utiNP����'�dx6N�2�a$ӊ���� �  ��jj���Gmw�8�%?��ئ��c��~�>�!Kw���t`�l���'��޷V�˧���Q�"�	?��G����/���'b8jV��%��O�����Ss�ӫ_�D�gE�_�qb����t�+�E��~��4i?*~����x��R�e�F�!���/��_m��I�~��
�,�&��z�;\4Vu�k~c1�bRE��ޢ�SV����Ev<(��w�p��P?�7���L,%��1�\ϼA%���O۰ EFϽ��S=�O�/oU�=��3݆��G�� p�@�X�7��BR�1ȋ�u��i�h�-��]�JRJy��E�����Tc��/��yԞ}���[��֋@KE0��Y��}��V_o�z�2%��^��\��N���;F�M���G��6i����>���C~�w��ko���K�?ޝ	�k�?>�#�=�������/�+���Hd�P!s�i����Ѿl�8�KO�	�����]�`8x>)$�$����A�%�S�K��}/��'�5B<H�ꬔ��J���_˪�wx�Wd	T*ݯW͔t܎�=�H�fX��)���hR��Q�=bR�7���pB�往ɨ4�����g�ҵ�~���XF-�h��[�d雍O���#�g�%��͵�	2u�`��֧��y�Y�SN��|ʤ%NF�������S��[5��}nYI�� ��^!�QZ,!@����$�~�͏�c�C�1��o��]J������ k�      }   I   x�3�L+JM�%\Ɯy�圑�y�@�	gF~	��iy�
�ۏl�N�
�r$��q�����b���� h��      {   *  x�uVKn�0\3��"�)~vt�ߺ@7,$��%����e����I��G۲(Y���y�Ù�� �'�<��ۮ�.����|A�R�Г��Z�i��@���lԧf�)�6_6�U{�#0+��k�����C��6E,�e���SW�@��4���4�����R���5}���v۾�����F.�W�4�Y3.��Vp�r`��v�[5nD�+S��5R��q��p�%��J/�q�K6�e�3X}h �Pg��@P��+�G�jB�W'�9	¹�%���k����T" :�6�F�*�02p{�v����8tSӀ� ^�W2��6�x��}���M'�rӕw�@9��j�v���q��j�9���Woc�m�vM�6���t���f��u�߻�+�J�ηOHɁK��.G&��\��=���^�r��A�����,��֬�fU8�b6��2&�@^�K��T�$�JX)sκ��Ф������^�kl�Z��z+��M�9/{����z�e�=�b���Y�a�&�+�����A��̛+���s2�(�!I$<y�¯�3�R�v1���ү�ƒ���W�R]��ɍ7�^�����W�Y0�%��W�:e��ԧ��o�㮏�@�������V�;!Y��(/O������Ք֘�.��6y�/N��ͫI�+IZI���WC�4,��vq��~�|2�YR	iu��r&ѸyC[���t��B�
P$��yeJC����LY-nC���[��u�Q�덊���}1�����k�u��1B��\�$US||.����rO��         �  x�-�M��6��������э��� �� ���i��%5 _`n_a���;��ʣ3��0E�,�"��^�J�(���2�Q�$�,�O�k�����%E�b1��|�Q��Q�I%G�c�X(���m9Q"*��ÇuR!���x����Η��c@K��;ۈ�AK��n��b����Ť�e׎b2�r���� zS�n?x��ѶS�f���M����x�8=�ΞZ+�=�I�V�r�c���zWK���[=͗�,q
z�'�vLZ��8�羱�s}�-���'�n��%.A/����?W����x����iI���$�I�$�A��w��J��ֵ��$�?�A�vl%�@��ӑ!$9h���� ��뎝%)A+��:V�VL@Ӫ���4�/���Ъ��c:�:�wO��v��)h��a����XS��HC<���
��%-@k�{^'-A�q>�\^��#e�K��+�̀�����%�A_Y�%���_S�F�MƑe��C�������uݻd%hc?����֍�{����kt�܀^�nO��<��n2�'��?�X��ΆIA���H���d��9�[wz��:�6����-�!�?�@K��#."�ѹ�����1h��c:A��<�C��d��,2Ђ�;��9�33��(@ߴ�>��%��q��v�.heC���k���TKi@O��iW�߿���\K      �      x�U�]n�<���U�X$u��JlH��
`��gv0W��a��̾�SE�y?`Pu,�ğ��&U<O�����?������N��˯_˰L�nS�^���4\|�=v����q���M��߹���K���&	�o��r����aSl37�����wS6L��_�qS�)�pY^�����q]��t�iæ��������;m��T>=��I��\��opc	��O�����~���<l�-p���nS\�i�o���z�swٔ�����^hnS֠˂�y���ȱ�~�R0�ꎨ������mS& oxݔ�����i�M���p������C�u�<4U%���Gޠ�A��K�&����~�x�k�������5.�@\���0~��z�Vdַ�D�;w����F�ٝ�y-^��e��h����g���u�T��5�c]21u���,����3�� �w঎\����{w9��M�r��3�]�Vx�tæ)������҃K�����?���0�MSa�������s����AM��o�_ϧM��ܢ)�D�l���S7\�i����x9�6a+x��ό�&����ݍ��	P�y<���߄:������-�˰	��~<���Ѕ���otp��Cc��g�ƭ����s�D��w�cw�6QT��]���be��{�F���_��t�����ҹ�6Q���ӣ(��q<hEz?��E�]�ޗi�M�$J^#�0�ҿ?���V����:��]���Ȟf�M��"}=�̑M�3X6���؝����G�2E]~���c�Q٤�E]��r�
��o�-�c��dn�ϓ&�qa������6���V,0m�Ɨ�̞V,�3���6N�r��ٴ�1,�qy�Q"���x�[1a�w�̤؊��O�b[>���u~Z�~+�}�!?��A����נ��������:��mX��e$ �����˼����n�ZZ������e��ԉ���'M�S� ,o�����SO;��V.��g�X�ۧ�$'���T��[k�KǠ�a���6
��̎nb�R�.���50J��Y,��t��*^'���*�l��Ͱ��e��κ�5O;/Qh���m�"*pѲ\?��ু�n�_��6�MNG�����\�w-�°e/\౱�X�C-C�����g���×8m �ػ���S/!45&�dY4��̞�κhztk?��vƇ����fP��1�"�9�����,�bV�A��F��&63}��Uน0L��O�W�$�\���
|x�0���8q����g(�	�#�໯ZX*Y��?_��N���Õ3O���O^H�O�;<y!AgJy
�̅��J�
�y���o�ϣc:��]�����=��ً_g=h�Ǘ�����-�Q���L�|g�w�@/��zz<9-����t����J��M��M�L��~/��P�B�����0�h������M�_<Զ��-L�/��������,�o�*�<+���@jk,AtOa)dy���&�ʰ��A^[-�f�}����M0)4�x|�|~������N���]	28~W��'�y��������Ѯ
�_X@'�+�����(N�> �<�X���o�|w�^�K-���Cft�
��V�r��p�t��׍Yʭ	�>�蕷.��h�^&�z,jXL�+�n1Q�
�WT\n��z���hG�w-Q !�o_V"�Ȼoη���.��p]��g��
؁7+G�h�w��Cc>���
���{��0�{�]����E��
]��nW�Q��2�˔�&@(y�j��q]G%�>���p�#�Ng ��R�8-�I� �H?	B:OJJ�c$�x���]���N��h�
i�J�E{�$�d��Mq�Z�ݙ5�A�THZg���|�d�/��r;�60	�]�\�l�ĥ�"����63��C�69�+O���X�o��-�̙#��h0��y%&�QJ1����0&T�!�!�Q�|�H�W��A$C��mP^��˸���98r]��ǼJ�������4f���MLQ �lLk>i:4f��1��ar5��2��;	̐L�]s�3s`wW�2�����C>�N��Ɛ_��(Oߣ3M4��p�SF�S҃��r/��n����!���,��~U��0'�&��9Ѭ���VѬ�ed�E3�&D�1zqE�!R �5��uD�˱?i
"\��LoD����L��P�W�������m(���[��OҎ:�f"�\�(��m9�.���P:K���V���i�a:H�J��TN������Ɩ�� �B,0ʀ��N�	e(@�2��;XV[S��,�g+� ���иB�^��t� �{@}c. ��C�+�?�|!|{��P ,�f�~�!�p�'�n�_���sQ�M���}��
	������@iͿp]�z8f@mp��Y� @&���C�zMV�\����8��b��MC�/��T����}X�zQ�Čޕ?��U6)Eu���Aa��*M�����4�K?�G��/�Af�i�H�*M�ڑ�>������0��t}��0!J��/������T���HNW�<�Z������)3����-�I�s,P!���W^!ѕ��W���y���kӝ�+���U��:?�e�ڔ�6�D�.�K��S���z��L��{���UI�����d�L��TIb֩<q�
Q*K�N�*	�,r1�����ȡ�x�SbRs��J�$&�R�x%�H���R�Ja|�e�J*��4й�d���)s%� �мvnkx=)��d")�����S=���=L��r��i�x�a03��8i�܇"�!So�lU�%�k��T��Qe��������$�Ӆ	.��4$��k埕��BXx5��ڮ�b�
���?wF!�jT!t�!���y-�U���T��,'��GtC�P�& �̅�J`׿pVȆ��&�3�v�O?B�n��bP<�k�.�{�IeX׋�dV��l�ք���Zә\��kn�hV�K��Y�42Odd��V�`���̡B1@����WD1*岼��<3R�FU�k�Q�k����p�F<���(h���N�vT�ċBy���Ĝ���Hk�Uo�t�{�f{�x��tWY�&�;gT�֨�ӟ�"�r�E��(k�Ry�f7_#(U�LsNY#)�T��#+�s�QJ��TRR�����ؠ�4�RYK����c0��&�23��yݔ��O�R#+x_FϿ@X���b���T/��R��u�F\����&�yS���8h�@V���p�zw�i;e��.�mL�z���6��Ù��IsvYR�\�98�+�^3e�$tXe���ndQ�U����iV��3��U�C���ʄ{Z}��k�w�o��,-+N0���M�͑�3��6ס��~]W��.ʉ��٢� �I��4���2����Uצ��X��l%X�f�t����ͳI��Ts}qݙ���ǖ%�n��U	Zm�;��'�a�e` s$ܚ��a��l�y���Oc���z���tS#;�J1�]����s7Oi��1���.W�3��V�p����vc5�#x�N��`��v��T����s�,bc��_.��z�������*f����\XL��G���fr����-ձ~�9�:6�����Km��
+u4ׁ���f:XQA�9���d�GB��HŊ���c2œ����:�����A�/��L��#թ��Q	4=�4���D�ڻ����RCZ��(���4�w���@A��v�ҟ��M�j-�	=����n��j)��Q5�Z
\�Տ�D����Z�]���tǱ2�Hq �I���
�{��Ho�����]��/Yg/�Z�Vw7����6R��Xynk^�n�����Mϼޚm�M�5�9*��Ea��m�����ȵ)̒�w�7X����sS��<�=�l
Ӽ�g��F"C�9t�(����3&�TF!�C�F��^�{h�Hcғv15��K�^JO��H\��9����5�a� )a���}�����ei��
���M�[��'���2����M7^�2�k��j�6���E�u �  �7R��5�^�2�Z/�iݜmdίL�(i����?��%S��>R�o�]�[imԋ�-Ui�>=�K��ؽs � %6��F�}kז���[��D#Gl���U҂j�o�jm]���Em����^;��^+SNݽ��=lSgX���%"��A:j�pT��y4�ֻ�u�]yQ��A6jE�7�!5G�ҍ��ڎ��9��1�Ք_�19�qzջ�tN�w��A/����rax�C�BE�*��'�,H��o[�:� 
B/�A�Z� u�� ����^� �=���]a���h��7�G?���ٺ���:�gF��U�)�M&�Ｓ�Đ�8�E�&��~��j�YƷ�MR�ɉ���6��ݩ�.�q��E�)������\A\][2�U1����M�nNfgw�~J��pba��.S�j}�Bk��Erנ!u����c���@P|��T���F��:CL0��
�!��ؠ4i}s���ɕ^G'��ߴ�dCOjo�єҀM������U������:)�2=e�����.��V�V�W�zP���!yS�T��mQ�2 )�����^1	�
&^WA �5�T�w|@VF��i��ׂ8*s�K]�2r@Wt͸��
�|W*�9��&�4(�k��_���g���PM倰��Ex|�"q����nA\��v��L6�a��JPYȚ�~�޲~F��'^��g�{�*c6L2�x�yr(Mtvb�*Ӝ�K\����FJ)�^t�ᢣf�)2{��'A�c�^�Wt�"(Ox�����q��<f@_������:��N-� r"˨ڼ�4��k��$2A����U
��'G��t�GIgB�К�6a���>V*�����3
���#5m�E��&��*{� ��9��!�V��D��v�X
������N����f�yФ5Q��hY��������N���
BJ���Ab#xQP�3�h.9�	B��~
Jb�4��/.x��8i=�@Gc(m��AC�T����ZHU(if�c�*�=A�������L��~�L�z�c� �i��<�B������Z��< y!�`�΀����W��� >�ct��^�W�DYT�x,X���:�{�s2PL:?�L-�/�#	�HD	v@\Ж�"4��)]ֺTq��vj��X�go��)~�Bx�5�HK�0@gq@��t�<�xTE��s7_h]i��8�U�/�" ,�t]�
��ᵻ�<Ai���<0ȉ����3 )�HNy�&�w{6�A{�d����ޱ�6nMQ��:Ҷ5Á�c�ۑ�;�������IE�g�O��
2;��Դs���U�I8����1����d�թ@DP�Z!kE>�(X^�̈�4�=x�$��iQi�����"�b�U9�A�A��i���:�0՜�D�q��NA�ap�.�&B����Gh	Zu1(�%@g�7�!R�����C?n�R��71����ŻM/��]�;/:�hrJ�:7^���dl���f�������~Z ����G���+�t�*�.j�ϑ~�N��:���1LD9/3��g+"�Ѩ���F�ҝ�)�RH��0�g���e�}�jܞ�L�M��`Fc��-��`�ǫ6�K?�\�6�##Иԇj��=���ɩ��x2�p��^u��"�H9׵������Dҙڠ��	���;p�#��������s�hTG��<ID�zIU`"� �L١G��O:���k��~"m�HC���#���d��Ј:`��e�<4����mD d�9��,�\��a*lZCD݆P`y��J�x��G����[?��Y��BY��RZ��_U@MD)�$��֍ ���p�h���L�7/��}29��+����n0����m���� 1J&�� �-�"�L��҉V�z��(���^���(�������V���K%��1�{��ËQ��泲����j����ql�ԯi�(F������E.ju?J������:���u��X���&�����hEخn2��I;wY,b�>Q�	'��EA�2���ikz7׈z��w���
�_J��J@�Bh� XguB)B�:�CVׄZd��]�P���9��0z!��r�<��@*B�@*����Xr*L���I�I*B{�6QM�y����y�T����ޥ���^��9Ղ�]Ϫ$#�z��[c�%$�h	�(�x���c	� �P�c4�9{�^��E�"BL8f �"Tkm����F���r����P�K�9��'���+I��J���9�����ld��~�v�2i6������$�#��RVw�j��~��P��r^&�0O�)~x?��&d$(�Q��� ry?�!�N�3`(Hx�/IHG��G7����!%�#4�׺*P���$		�B�P��٠�>~�87��qX��>3��d���?:���I����G��~�)��o5;�u�3$�cF�Lne��K}�W�RQ^��O�h���F���L�f#�g������ۍ���va���k}���G��Z-}�\^���o8*��GXϝI�����������c��H[�]�"B�f�M�W4O��l�^4�s��?�{W�/�z�g��=�zT�:'==P,y7�l9�;�����\'��^̅�\�L�I���J�I���k�"�'ق�eϊ���6&d$���	%	��}��r�����tZ��#��u.
$�I��hz��b`R�l5�s������ ,yoa��0a.e^�l����(�n������StŖQ��dPMU>�w}>�ע,1ׅ����Hk�;��i����[�%�(߸~�"-Q�LB��a��@��-���݋'��JTMu�1��+� �ǜ�@Vb���$4w�YMC�RY���tޥ{ߴhV����EW����_��y���".Q����J���%�s�w�EV��)'D-�²"m���E�*�M�K���K��k����Q�rX>c,w�	%��M (Q1�ɢ%�q��EH@��m��?��""1���>��""1���
�����Џ��C�0������G��� xI����r��d-��EA@J!�R(.��aעq]�98j��~nn�V�m����GVtr��"!1=�z�(ި����e�"B�X��7�����)���耢��լ��$�g棍V�\�%I?�I
���o4t9�h�5�ED��)7�P� o��ii���.w��oS���>o�4Ο4z��R��鯾����p��� ]���������f���A�      �   �   x���=n�0��>�O`G���-E�v):�c�@V�T�"m�'�1<v��ޫ� � Z�Ç�G'+	�̍��sϒ���k�蒱˧u�J2���G����+�/룸f�='KxC�d#�M ��LL^�9��se���C/�t�O$+�xԽ����ڣo��ŋ�o�A��t����D�� o�+��з/Rmy��6�f���Qt� ��*=��8�
ci�J�5;�:��m0߳$I� ��<�      �   �  x�}T�n�@]_�h���T��.J%P�H�\ȐN=�#��d~ ?Q)ˬ�銝��ܱq ����c��܇]�iAk��;�;��^&�7*�rvҙ&F��
��޴�����w���98KeJ�jY(�PV��+�R% C��*H_a�m�F�����!8+��6�@�@w���A�6=aú��������@wj"|���J�|Uw8�9S-�._�eGUn)q�e!���̷�=䵇V2�u�=��$�� S۔ݠ5��Li�J�BP3�ѼX�A_|z�Q��Yr-ܱ����pQgJ?(C���;�� C������wY3�]���k�籅�Ȏm��*�ѹI���Tl�a�����\Ж=1��� ŕ����K����wzId�r�j�QW7�u�Ӻ#�o�*c�}�yfr��gdK���=.s�����y72�jL��w�~V.�<u��G��A��m�� h�2����Lj��ZcA� �r<��]����{��D��L���3B�R�	�`�r)�����F�U�\]�i�=�̛�|S%���I�r�7�
B��cG�jA�SFb�	�;���{Y�B��|0��|�gAz�E��p��b"��N9�Esطl��yfJrJ�)�ЇjSd�c�*+;F�5dk��Ъ�g���6J;���6�xONٍ �e7���ZNMkJZ��ѐ����ˈG��Ǡy��7'���ϳ2Rw]n����Z�kG����}�F�v      x   �  x���ْ�F��5O���ʒh	M�+f$-�o�A @��C�;̃�G�c�N��*���S�k >_��
�wq�$V���<?��O#?*�j�G���*˓��8�e�y3�F�˄"(>F�`�P��Ql��:#G�Q�=@�t$S�Dˣ��9v<p3K�/���g�o�Q�V�>�烩�q#U���Ji������~�FޝD��WW��R��\�(��r�Իx(��6`��� ��GLH�I����|�yYG�YQ�<�v���rND6�A��ʔ��^䯝�'$I�����"���*/�Ӳ�
+�&A��g�ѭH�[I�N���s]ǞXy^�Yu�F���^�����ۤp䯴�VcUV1���&c���h �~@�[E�1�#0-%8���٠�+K���=�*���^��t��XY	?�w��u��W4��Y������/\�C��#��1(� �� ����>꺶҄����4�q�7�*��T��Z��31��d��	c(5�X]ֳTBi֮d4�ݼ���d���WK+����ET,T7R�JIE��ݳX�,vu�1����Ң,�r��	Z��������q����V��6�	�6��s5�+-0�I;�Ԓ�j���ҢE��2��8T��	Eԋ�S=�S0�fWb#5��6n������z���	'������I�8�t沗U���h&�d���!�վ��a�R��ar�6�P�l��q׳KWh%������1�������ܪB���B�~�@o`��u�t�/�(I~��(����#F����8��p� #�.B+}C���	y��	���ؗ|�5tK�u���k3��|�ʹ�m��"�m��r��^-�c6�OX|M�G�����M����+���T�N�]�s ��I�KI�wM��x�X�q��!%��}2���k�R�ݵ�6��b�^���]a�*��ݕ���e��<��EH8�mII>c���]e�$�qB���"aT3!Yn��D�:9�Ԣڗ��4�jsU���]�|�'����;uF_ec�IC�PG�����"k�����S�; ���2��Þ	ݠB�Q;��z�''\��t[�[�p�ps�U�,��"��6>9ĵ銝s=�Z�^�ڗ��d;zKxΛ�-�9'C�����j}bB�s��D�
ֈ�J<��`�=?��H��{�R����T���ϓ���? �M�5     