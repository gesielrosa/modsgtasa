# Mods GTA San Andreas

- Copiar o index no editor HTML;
- Sair do editor e entrar novamente. O Blogger irá gerar o site;
- Procure "firstImageUrl" e substitua o código abaixo pelo conteúdo do "post-thumbnail":
  ```
  <!-- Then use the post body as the schema.org description, for good G+/FB snippeting. -->
    <div class='post-body entry-content' expr:id='&quot;post-body-&quot; + data:post.id' expr:itemprop='(data:blog.metaDescription ? &quot;&quot; : &quot;description &quot;) + &quot;articleBody&quot;'>
      <data:post.body/>
      <div style='clear: both;'/> <!-- clear for photos floats -->
    </div>
  ```
- Copiar as section para os devidos lugares;

### Falta fazer

- Página de download;
- Votação;
- Breadcrumb;
- Paginação;
- Comentários Facebook;
- Posts semelhantes
