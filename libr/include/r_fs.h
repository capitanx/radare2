#ifndef _LIB_R_FS_H_
#define _LIB_R_FS_H_

#include <r_types.h>
#include <r_list.h>
#include <r_io.h>

struct r_fs_plugin_t;
struct r_fs_root_t;
struct r_fs_t;

typedef struct r_fs_t {
	RIOBind iob;
	RList /*<RFSPlugin>*/ *plugins;
	RList /*<RFSRoot>*/ *roots;
	void *ptr;
} RFS;

typedef struct r_fs_file_t {
	char *name;
	char *path;
	ut64 off;
	ut32 size;
	ut8 *data;
	void *ctx;
	char type;
	ut64 time;
	struct r_fs_plugin_t *fs;
	void *ptr;
} RFSFile;

typedef struct r_fs_root_t {
	char *path;
	ut64 delta;
	struct r_fs_plugin_t *fs;
	void *ptr;
} RFSRoot;

typedef struct r_fs_plugin_t {
	const char *name;
	const char *desc;
	RFSFile* (*open)(const char *path);
	boolt (*read)(RFSFile *fs, ut64 addr, int len);
	void (*close)(RFSFile *fs);
	RList *(*dir)(RFSRoot *root, const char *path);
	void (*init)();
} RFSPlugin;

#define R_FS_FILE_TYPE_DIRECTORY 'd'
#define R_FS_FILE_TYPE_REGULAR 'r'

#ifdef R_API

R_API RFS *r_fs_new ();
R_API void r_fs_free (RFS* fs);
R_API void r_fs_add (RFS *fs, RFSPlugin *p);
R_API void r_fs_del (RFS *fs, RFSPlugin *p);
R_API RFSRoot *r_fs_mount (RFS* fs, const char *fstype, const char *path);
R_API int r_fs_umount (RFS* fs, const char *path);
R_API RFSRoot *r_fs_root (RFS *fs, const char *path);
R_API RFSFile *r_fs_open (RFS* fs, const char *path);
R_API void r_fs_close (RFS* fs, RFSFile *file);
R_API int r_fs_read (RFS* fs, RFSFile *file, ut64 addr, int len);
R_API RList *r_fs_dir(RFS* fs, const char *path);

/* file.c */
R_API RFSFile *r_fs_file_new (const char *path);
R_API void r_fs_file_free (RFSFile *file);
R_API RFSRoot *r_fs_root_new (const char *path, ut64 delta);
R_API void r_fs_root_free (RFSRoot *root);

/* plugins */
extern RFSPlugin r_fs_plugin_ext2;
#endif

#endif