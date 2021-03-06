<?php echo $header_nav; ?>

<!-- wrapper -->
<div class="rapidxwpr floatholder">

  <!-- main body -->
  <div id="middle">
    <!-- <div class="background layoutleft"> -->
      
      <!-- header -->
      <div id="header">

        <!-- logo -->
        <?php if ($banner == NULL): ?>
        <div id="logo">
          <h1><a href="<?php echo url::site();?>"><?php echo $site_name; ?></a></h1>
          <span><?php echo $site_tagline; ?></span>
        </div>
        <?php else: ?>
        <a href="<?php echo url::site();?>"><img src="<?php echo $banner; ?>" alt="<?php echo $site_name; ?>" /></a>
        <?php endif; ?>
        <!-- / logo -->

      </div>
      <!-- / header -->
          <!-- / header item for plugins -->
          <?php
              // Action::header_item - Additional items to be added by plugins
            Event::run('ushahidi_action.header_item');
          ?>

      <!-- mainmenu -->
      <!-- <div id="mainmenu" class="clearingfix">
        <ul>
          <?php nav::main_tabs($this_page); ?>
        </ul>

        <?php if ($allow_feed == 1) { ?>
        <div style="float:right;"><a href="<?php echo url::site(); ?>feed/"><img alt="<?php echo htmlentities(Kohana::lang('ui_main.rss'), ENT_QUOTES); ?>" src="<?php echo url::file_loc('img'); ?>media/img/icon-feed.png" style="vertical-align: middle;" border="0" /></a></div>
        <?php } ?>

      </div> -->
      <!-- / mainmenu -->
      
      <div id="panel-wrapper" class="open">
        <ul id="panel-tabs">
          <li class="panel-submit"><a href="#submit">Submit</a></li><li class="panel-pins"><a href="#pins">Pins</a></li><li class="panel-contact"><a href="#contact">Contact</a></li><li class="panel-info"><a href="#">Info</a></li>
        </ul>
        <div id="submit-panel" class="panel">
          <iframe name="reports" src="<?php echo url::site();?>reports/submit?panel" frameborder="0" ></iframe>
        </div>
        <div id="pins-panel" class="panel">          
          <iframe name="pins" src="<?php echo url::site();?>reports?panel" frameborder="0" ></iframe>
        </div>
        <div id="contact-panel" class="panel">
          <iframe src="<?php echo url::site();?>contact?panel" frameborder="0" ></iframe>
        </div>
        <div id="info-panel" class="panel">
          <div id="info-close" class="olPopupCloseBox"></div>
          <iframe frameborder="0" ></iframe>
        </div>
      </div>