<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <title>DNArtwork</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css?family=Sorts+Mill+Goudy" rel="stylesheet">
  <link href="/app.css" rel="stylesheet">
  <meta property="og:image" content="https://dnartwork-render-image.azurewebsites.net/api/render-image?<?php echo urlencode($_REQUEST['art']); ?>"/>
  <?php if ($_REQUEST['title']) { ?>
    <meta property="og:title" content="<?php echo htmlentities($_REQUEST['title']); ?>"/>
  <?php } ?>
  <script src="/app.js"></script>
  <script>require('initialize');</script>
</head>
<body>
  <div class="content-page content-page-no-header share-page">
    <div class="contained-content article-content">
      <?php if ($_REQUEST['title']) { ?>
        <h1 class="share-page-title"><?php echo htmlentities($_REQUEST['title']); ?></h1>
      <?php } ?>
      <p><img class="artwork-image" id="artwork-share-image" src="https://dnartwork-render-image.azurewebsites.net/api/render-image?<?php echo urlencode($_REQUEST['art']); ?>" /></p>
      <?php if ($_REQUEST['message']) { ?>
        <p><?php echo htmlentities($_REQUEST['message']); ?></p>
      <?php } ?>
    </div>
  </div>
</body>
</html>
