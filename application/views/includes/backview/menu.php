<section>
    <!-- Left Sidebar -->
    <aside id="leftsidebar" class="sidebar">
        <!-- User Info -->
        <div class="user-info">
            <div class="image">
                <img src="<?php echo (!$session['avatar'] || $session['avatar'] == NULL) ? base_url() . 'assets/backview/images/user.png' : base_url() . 'uploads/images/avatars/thumbnail/' . $session['avatar']; ?>" width="48" height="48" alt="User" />
            </div>
            <div class="info-container">
                <div class="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><?php echo ($session['nama']) ? $session['nama'] : '' ; ?></div>
                <div class="email"><?php echo ($session['email']) ? $session['email'] : '' ; ?></div>
                <div class="btn-group user-helper-dropdown">
                    <i class="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">keyboard_arrow_down</i>
                    <ul class="dropdown-menu pull-right">
                        <li><a href="<?php echo site_url('users/edit/'.$session['id']) ?>"><i class="material-icons">person</i>Profile</a></li>
                        <li role="seperator" class="divider"></li>
                        <li><a href="<?php echo site_url('login/logout') ?>"><i class="material-icons">input</i>Sign Out</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- #User Info -->
        <!-- Menu -->
        <div class="menu">
            <ul class="list">
                <li class="header">MAIN NAVIGATION</li>
                <li <?php echo ($this->uri->segment(1) == 'dashboard' || $this->uri->segment(1) == '') ? 'class="active"' : '' ; ?>>
                    <a href="<?php echo site_url('dashboard') ?>">
                        <i class="material-icons">dashboard</i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <?php if ($session['bisa_buat_tugas'] == 1) { ?>
                    <li <?php echo ($this->uri->segment(1) == 'items') ? 'class="active"' : '' ; ?>>
                        <a href="javascript:void(0);" class="menu-toggle">
                            <i class="material-icons">assignment_ind</i>
                            <span>Item</span>
                        </a>
                        <ul class="ml-menu">
                            <li>
                                <a href="<?php echo site_url('items/form') ?>">
                                    <span>Tambah Item</span>
                                </a>
                            </li>
                            <li>
                                <a href="<?php echo site_url('items/table') ?>">
                                    <span>Data Item</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                <?php } ?>
                <li <?php echo ($this->uri->segment(1) == 'jobs') ? 'class="active"' : '' ; ?>>
                    <a href="javascript:void(0);" class="menu-toggle">
                        <i class="material-icons">archive</i>
                        <span>Pekerjaan</span>
                    </a>
                    <ul class="ml-menu">
                            <li>
                                <a href="<?php echo site_url('jobs/form') ?>">
                                    <span>Tambah Pekerjaan</span>
                                </a>
                            </li>
                            <li>
                                <a href="<?php echo site_url('jobs/table') ?>">
                                    <span>Data Pekerjaan</span>
                                </a>
                            </li>
                        </ul>
                </li>
                <li <?php echo ($this->uri->segment(1) == 'projects') ? 'class="active"' : '' ; ?>>
                    <a href="javascript:void(0);" class="menu-toggle">
                        <i class="material-icons">event</i>
                        <span>Proyek</span>
                    </a>
                    <ul class="ml-menu">
                        <li>
                            <a href="<?php echo site_url('projects/form') ?>">
                                <span>Tambah Proyek</span>
                            </a>
                        </li>
                        <li>
                            <a href="<?php echo site_url('projects/table') ?>">
                                <span>Data Proyek</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li <?php echo ($this->uri->segment(1) == 'transactions') ? 'class="active"' : '' ; ?>>
                    <a href="javascript:void(0);" class="menu-toggle">
                        <i class="material-icons">payment</i>
                        <span>Transaksi</span>
                    </a>
                    <ul class="ml-menu">
                        <li>
                            <a href="<?php echo site_url('transactions/form') ?>">
                                <span>Tambah Transaksi</span>
                            </a>
                        </li>
                        <li>
                            <a href="<?php echo site_url('transactions/group-form') ?>">
                                <span>Tambah Jenis Transaksi</span>
                            </a>
                        </li>
                        <li>
                            <a href="<?php echo site_url('transactions/table') ?>">
                                <span>Data Transaksi</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li <?php echo ($this->uri->segment(1) == 'accounts') ? 'class="active"' : '' ; ?>>
                    <a href="javascript:void(0);" class="menu-toggle">
                        <i class="material-icons">label</i>
                        <span>Akun/Akun Bantu</span>
                    </a>
                    <ul class="ml-menu">
                        <li>
                            <a href="<?php echo site_url('accounts/form') ?>">
                                <span>Tambah Akun Bantu</span>
                            </a>
                        </li>
                        <li>
                            <a href="<?php echo site_url('accounts/table') ?>">
                                <span>Data Akun/Akun Bantu</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- #Menu -->
        <!-- Footer -->
        <div class="legal">
            <div class="copyright">
                &copy; <?php echo date('Y') ?> <a href="javascript:void(0);">Jobcosting</a>.
            </div>
            <div class="version">
                <b>Version: </b> 0.0.1
            </div>
        </div>
        <!-- #Footer -->
    </aside>
    <!-- #END# Left Sidebar -->
    <!-- Right Sidebar -->
    <aside id="rightsidebar" class="right-sidebar">
        <ul class="nav nav-tabs tab-nav-right" role="tablist">
            <li role="presentation" class="active"><a href="#skins" data-toggle="tab">SKINS</a></li>
            <li role="presentation"><a href="#settings" data-toggle="tab">SETTINGS</a></li>
        </ul>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade in active in active" id="skins">
                <ul class="demo-choose-skin">
                    <li data-theme="red" class="active">
                        <div class="red"></div>
                        <span>Red</span>
                    </li>
                    <li data-theme="pink">
                        <div class="pink"></div>
                        <span>Pink</span>
                    </li>
                    <li data-theme="purple">
                        <div class="purple"></div>
                        <span>Purple</span>
                    </li>
                    <li data-theme="deep-purple">
                        <div class="deep-purple"></div>
                        <span>Deep Purple</span>
                    </li>
                    <li data-theme="indigo">
                        <div class="indigo"></div>
                        <span>Indigo</span>
                    </li>
                    <li data-theme="blue">
                        <div class="blue"></div>
                        <span>Blue</span>
                    </li>
                    <li data-theme="light-blue">
                        <div class="light-blue"></div>
                        <span>Light Blue</span>
                    </li>
                    <li data-theme="cyan">
                        <div class="cyan"></div>
                        <span>Cyan</span>
                    </li>
                    <li data-theme="teal">
                        <div class="teal"></div>
                        <span>Teal</span>
                    </li>
                    <li data-theme="green">
                        <div class="green"></div>
                        <span>Green</span>
                    </li>
                    <li data-theme="light-green">
                        <div class="light-green"></div>
                        <span>Light Green</span>
                    </li>
                    <li data-theme="lime">
                        <div class="lime"></div>
                        <span>Lime</span>
                    </li>
                    <li data-theme="yellow">
                        <div class="yellow"></div>
                        <span>Yellow</span>
                    </li>
                    <li data-theme="amber">
                        <div class="amber"></div>
                        <span>Amber</span>
                    </li>
                    <li data-theme="orange">
                        <div class="orange"></div>
                        <span>Orange</span>
                    </li>
                    <li data-theme="deep-orange">
                        <div class="deep-orange"></div>
                        <span>Deep Orange</span>
                    </li>
                    <li data-theme="brown">
                        <div class="brown"></div>
                        <span>Brown</span>
                    </li>
                    <li data-theme="grey">
                        <div class="grey"></div>
                        <span>Grey</span>
                    </li>
                    <li data-theme="blue-grey">
                        <div class="blue-grey"></div>
                        <span>Blue Grey</span>
                    </li>
                    <li data-theme="black">
                        <div class="black"></div>
                        <span>Black</span>
                    </li>
                </ul>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="settings">
                <div class="demo-settings">
                    <p>GENERAL SETTINGS</p>
                    <ul class="setting-list">
                        <li>
                            <span>Report Panel Usage</span>
                            <div class="switch">
                                <label><input type="checkbox" checked><span class="lever"></span></label>
                            </div>
                        </li>
                        <li>
                            <span>Email Redirect</span>
                            <div class="switch">
                                <label><input type="checkbox"><span class="lever"></span></label>
                            </div>
                        </li>
                    </ul>
                    <p>SYSTEM SETTINGS</p>
                    <ul class="setting-list">
                        <li>
                            <span>Notifications</span>
                            <div class="switch">
                                <label><input type="checkbox" checked><span class="lever"></span></label>
                            </div>
                        </li>
                        <li>
                            <span>Auto Updates</span>
                            <div class="switch">
                                <label><input type="checkbox" checked><span class="lever"></span></label>
                            </div>
                        </li>
                    </ul>
                    <p>ACCOUNT SETTINGS</p>
                    <ul class="setting-list">
                        <li>
                            <span>Offline</span>
                            <div class="switch">
                                <label><input type="checkbox"><span class="lever"></span></label>
                            </div>
                        </li>
                        <li>
                            <span>Location Permission</span>
                            <div class="switch">
                                <label><input type="checkbox" checked><span class="lever"></span></label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </aside>
    <!-- #END# Right Sidebar -->
</section>